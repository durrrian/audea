import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@repo/prisma'
import { midtrans } from '@repo/api'
import type { Payment } from '@repo/prisma/client'
import { makeNewMembership } from '@repo/trigger'
import { currentProfile } from '@repo/clerk-action'
import { Progress } from './lib/progress'
import { PaymentIncomplete } from './lib/payment-incomplete'
import { AlreadyRedemmedPayment } from './already-redemmed-payment'

export function generateMetadata(): Metadata {
  return {
    title: 'Supercuan Saham — Pembayaran',
  }
}

interface Prop {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: Prop) {
  if (!searchParams?.order_id) return notFound()

  const loggedInUser = await currentProfile()

  if (!loggedInUser) return redirect('/sign-in')

  const orderId = searchParams.order_id.toString()

  const orderIdArr = orderId.split('-')

  if (orderIdArr.length !== 4 || orderIdArr[0] !== 'ss') return redirect(`/payment-capture/error`)

  const userId = orderIdArr[1]
  const time = Number(orderIdArr[2]) * 1000
  const tier = orderIdArr[3]

  if (new Date(time) > new Date()) return redirect(`/payment-capture/error`)

  if (tier !== 'BRONZE' && tier !== 'SILVER' && tier !== 'GOLD' && tier !== 'PLATINUM') {
    return redirect(`/payment-capture/error`)
  }

  if (loggedInUser.id !== userId) return redirect(`/payment-capture/error`)

  const price = await prisma.prices.findFirst({ where: { tier } })

  if (!price) return redirect(`/payment-capture/error`)

  const payment = await prisma.payment.findFirst({ where: { order_id: orderId }, include: { membership: true } })

  if (payment && payment.membership) return <AlreadyRedemmedPayment />

  const paymentStatus = await midtrans.transaction.status(orderId)

  if (paymentStatus.transaction_status !== 'capture' && paymentStatus.transaction_status !== 'settlement') {
    return <PaymentIncomplete transactionStatus={paymentStatus} membership={loggedInUser.membership} />
  }

  if (payment && payment.deferId) {
    return <Progress deferId={payment.deferId} user={loggedInUser} />
  }

  let newPayment: Payment

  if (!payment) {
    newPayment = await prisma.payment.create({
      data: {
        userId: loggedInUser.id,
        tier: price.tier,
        payment_type: paymentStatus.payment_type,
        status_code: paymentStatus.status_code,
        transaction_status: paymentStatus.transaction_status,
        order_id: paymentStatus.order_id,
        transaction_id: paymentStatus.transaction_id,
      },
    })
  } else {
    newPayment = payment
  }

  const { id: deferId } = await makeNewMembership.invoke({
    order_id: newPayment.order_id,
    transaction_id: newPayment.transaction_id,
  })

  await prisma.payment.update({ where: { id: newPayment.id }, data: { deferId } })

  return <Progress deferId={deferId} user={loggedInUser} />
}
