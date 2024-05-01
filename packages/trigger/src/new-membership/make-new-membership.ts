import { invokeTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { z } from 'zod'
import type { Prices } from '@repo/prisma/client'
import { prisma } from '@repo/prisma'
import { Telegram, createMembership, midtrans } from '@repo/api'
import { sendEmailNewMembership } from './send-email-new-membership'

const schema = z.object({
  order_id: z.string(),
  transaction_id: z.string(),
})

export const makeNewMembership = trigger.defineJob({
  id: 'make-new-membership',
  name: 'Make New Membership',
  version: '0.1.0',

  trigger: invokeTrigger({ schema }),

  run: async (payload, io, _ctx) => {
    const progress = await io.createStatus('creating-membership', {
      label: 'Verifying your payment...',
      state: 'loading',
      data: {
        progress: 0.25,
      },
    })

    const { user, price, payment, time } = await io.runTask(
      'verified-payment-and-user',
      async () => {
        const orderIdArr = payload.order_id.split('-')

        if (orderIdArr.length !== 4 || orderIdArr[0] !== 'ss') throw new Error('Invalid order_id')

        const transaction = await midtrans.transaction.status(payload.order_id)

        const transaction_status = transaction.transaction_status

        if (transaction_status !== 'capture' && transaction_status !== 'settlement') {
          throw new Error('Transaction not settled')
        }

        const userId = orderIdArr[1]
        const time = Number(orderIdArr[2]) * 1000
        const tier = orderIdArr[3] as Prices['tier']

        const user = await prisma.user.findFirstOrThrow({
          where: { id: userId },
          include: { membership: { orderBy: [{ endDate: 'desc' }], take: 1 }, emailNotification: true, telegram: true },
        })

        const price = await prisma.prices.findFirstOrThrow({ where: { tier } })

        const payment = await prisma.payment.findFirstOrThrow({
          where: { order_id: payload.order_id, userId: user.id, transaction_id: payload.transaction_id },
          include: { membership: true },
        })

        return { user, price, payment, time }
      },
      { retry: { limit: 2 } },
    )

    if (payment.membership) {
      await progress.update('finish', {
        label: 'Membership already created!',
        state: 'success',
        data: {
          progress: 1,
        },
      })

      return { newMembership: payment.membership, type: 'new-member', oldMembership: null }
    }

    await progress.update('creating-your-membership', {
      label: 'Creating your membership...',
      state: 'loading',
      data: {
        progress: 0.75,
      },
    })

    const { type, newMembership, oldMembership } = await io.runTask('create-membership', async () => {
      const response = await createMembership(price, time, user, user.membership[0] ?? null)

      return response
    })

    await progress.update('finishing', {
      label: 'Finishing up...',
      state: 'loading',
      data: {
        progress: 0.9,
      },
    })

    await io.runTask('other-stuff', async () => {
      if (!user.emailNotification) {
        await prisma.emailNotification.create({ data: { userId: user.id } })
      }

      await prisma.payment.update({
        where: { id: payment.id },
        data: { membershipId: newMembership.id },
      })

      await sendEmailNewMembership.invoke(`${user.id}-new-membership`, {
        user: { name: user.name, email: user.email },
        membership: { tier: newMembership.tier, endDate: new Date(newMembership.endDate).toISOString() },
        type,
      })

      if (type === 'look-whos-back' && user.telegram) {
        const telegram = new Telegram(user.telegram.telegramUserId)

        await telegram.unbanChatMember()
      }
    })

    await progress.update('finish', {
      label: 'Membership has been successfully created!',
      state: 'success',
      data: {
        progress: 1,
      },
    })

    return { type, newMembership, oldMembership }
  },
})
