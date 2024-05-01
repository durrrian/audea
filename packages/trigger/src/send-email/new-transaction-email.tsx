import { invokeTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { prisma } from '@repo/prisma'
import { FROM_EMAIL_RESEND } from '@repo/helper'
import Email from '@repo/email/templates/new-transaction-notification'
import { resend } from '@repo/email'
import { z } from 'zod'

const schema = z.object({
  transaction: z.array(
    z.object({
      type: z.enum(['BUY', 'SELL']),
      lot: z.number(),
      price: z.number(),
      time: z.string(),
      kodeEmiten: z.string(),
    }),
  ),

  currentCash: z.number(),
})

export const newTransactionEmail = trigger.defineJob({
  id: 'new-transaction-email',
  name: 'New Transaction Email',
  version: '0.1.0',

  trigger: invokeTrigger({ schema }),

  run: async (payload, io, _ctx) => {
    const allUsers = await io.runTask('get-all-users', async () => {
      return prisma.user.findMany({
        include: { emailNotification: true, membership: { orderBy: [{ endDate: 'desc' }], take: 1 } },
      })
    })

    for (const user of allUsers) {
      const membership = user.membership[0]
      const notification = user.emailNotification
      const enable = membership && new Date(membership.endDate) > new Date() && notification && notification.buySell

      if (!enable) continue

      await io.runTask(
        `send-transaction-email-${user.id}`,
        async () => {
          await resend.emails.send({
            from: FROM_EMAIL_RESEND,
            to: user.email,
            subject: 'Ada transaksi emiten terbaru!',
            react: (
              <Email
                email={user.email}
                name={user.name}
                transactions={payload.transaction}
                currentCash={payload.currentCash}
              />
            ),
          })
        },
        { retry: { limit: 2 } },
      )
    }
  },
})
