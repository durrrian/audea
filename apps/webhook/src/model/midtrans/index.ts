'use server'

import { delay } from '@repo/helper'
import { prisma } from '@repo/prisma'
import { midtrans as midtransApi } from '@repo/api'
import type { Prices } from '@repo/prisma/client'
import { makeNewMembership } from '@repo/trigger'

/**
 * Midtrans will retry when encountering HTTP error status codes, & differently based on it.
 * - for 2xx: No retries, it is considered successfully received.
 * - for 500: Retry only once.
 * - for 503: Retry 4 times.
 * - for 400/404: Retry 2 times.
 * - for 301/302/303: No retries, these redirect status codes is not supported. We suggest you to update the Notification endpoint URL. Do not intentionally reply with them.
 * - for 307/308: Follow the new URL with POST method and same notification body. Max redirect is 5 times.
 * - for all other failures: Retry 5 times.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- payload json is always as any
export async function midtrans(requestBody: Record<string, any>) {
  try {
    /**
     * Wait 5 seconds so that it does not clash
     * with the web-app
     */
    await delay(5000)

    const statusResponse: Record<string, string> = await midtransApi.transaction.notification(requestBody)

    const orderId = statusResponse.order_id
    const transactionStatus = statusResponse.transaction_status
    const transactionId = statusResponse.transaction_id

    if (transactionStatus !== 'capture' && transactionStatus !== 'settlement') {
      return Response.json({ error: 'Transaction status is not complete' }, { status: 200 })
    }

    const orderIdArr = orderId.split('-')

    const userId = orderIdArr[1]
    // const startDateTimeStamp = Number(orderIdArr[2]) * 1000
    const tier = orderIdArr[3] as Prices['tier']

    const user = await prisma.user.findFirst({ where: { id: userId } })

    if (!user) return Response.json({ error: 'User not found' }, { status: 404 })

    const price = await prisma.prices.findFirst({ where: { tier } })

    if (!price) return Response.json({ error: 'Price not found' }, { status: 404 })

    const payment = await prisma.payment.findFirst({
      where: {
        transaction_id: transactionId,
        userId: user.id,
        order_id: orderId,
      },
      include: { membership: true },
    })

    if (payment && payment.membership) {
      return Response.json({ success: 'Payment has already been redemmed' }, { status: 200 })
    }

    if (payment && payment.deferId) {
      return Response.json({ success: 'Background function has already been run!' }, { status: 200 })
    }

    if (payment && !payment.deferId) {
      const { id: deferId } = await makeNewMembership.invoke({
        order_id: payment.order_id,
        transaction_id: payment.transaction_id,
      })

      await prisma.payment.update({ where: { id: payment.id }, data: { deferId } })

      return Response.json({ success: 'Background function is running!' }, { status: 200 })
    }

    const newPayment = await prisma.payment.create({
      data: {
        userId: user.id,
        tier: price.tier,
        payment_type: statusResponse.payment_type,
        status_code: statusResponse.status_code,
        transaction_status: statusResponse.transaction_status,
        order_id: statusResponse.order_id,
        transaction_id: statusResponse.transaction_id,
      },
    })

    const { id: deferId } = await makeNewMembership.invoke({
      order_id: newPayment.order_id,
      transaction_id: newPayment.transaction_id,
    })

    await prisma.payment.update({ where: { id: newPayment.id }, data: { deferId } })

    // return Response.json({ success: 'Background function is running!' }, { status: 200 })
  } catch (error) {
    console.error(JSON.stringify(error, null, 2))
    return Response.json({ error }, { status: 503 })
  }
}
