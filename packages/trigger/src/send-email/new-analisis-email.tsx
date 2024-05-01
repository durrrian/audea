import { invokeTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { prisma } from '@repo/prisma'
import { FROM_EMAIL_RESEND } from '@repo/helper'
import Email from '@repo/email/templates/new-analisis-notification'
import { resend } from '@repo/email'
import { z } from 'zod'

const schema = z.object({
  id: z.string(),
  title: z.string(),
  emitenId: z.string(),
  kodeEmiten: z.string(),
})

export const newAnalisisEmail = trigger.defineJob({
  id: 'new-analisis-email',
  name: 'New Analisis Email',
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
      const enable = membership && new Date(membership.endDate) > new Date() && notification && notification.newAnalisis

      if (!enable) continue

      await io.runTask(
        `send-analisis-email-${user.id}`,
        async () => {
          await resend.emails.send({
            from: FROM_EMAIL_RESEND,
            to: user.email,
            subject: 'Ada analisis terbaru!',
            react: <Email analisis={payload} email={user.email} name={user.name} />,
          })
        },
        { retry: { limit: 2 } },
      )
    }
  },
})
