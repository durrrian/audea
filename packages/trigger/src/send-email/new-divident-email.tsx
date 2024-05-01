import { invokeTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { prisma } from '@repo/prisma'
import { FROM_EMAIL_RESEND } from '@repo/helper'
import Email from '@repo/email/templates/new-divident-notification'
import { resend } from '@repo/email'
import { z } from 'zod'

const schema = z.object({
  divident: z.array(
    z.object({
      dps: z.number(),
      time: z.string(),
      kodeEmiten: z.string(),
      shares: z.number(),
    }),
  ),
  currentCash: z.number(),
})

export const newDividentEmail = trigger.defineJob({
  id: 'new-divident-email',
  name: 'New Divident Email',
  version: '0.1.0',

  trigger: invokeTrigger({ schema }),

  run: async (payload, io, _ctx) => {
    const allUsers = await io.runTask('get-all-users', async () => {
      return prisma.user.findMany({
        include: { emailNotification: true, membership: { orderBy: [{ endDate: 'desc' }], take: 1 } },
        where: { OR: [{ email: 'furqon@durrrian.com' }] },
      })
    })

    for (const user of allUsers) {
      const membership = user.membership[0]
      const notification = user.emailNotification

      const enable = membership && new Date(membership.endDate) > new Date() && notification && notification.newDivident

      if (!enable) continue

      await io.runTask(
        `send-divident-email-${user.id}`,
        async () => {
          await resend.emails.send({
            from: FROM_EMAIL_RESEND,
            to: user.email,
            subject: 'Ada transaksi divident terbaru!',
            react: (
              <Email
                email={user.email}
                name={user.name}
                divident={payload.divident}
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
