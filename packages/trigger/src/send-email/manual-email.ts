import { invokeTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { prisma } from '@repo/prisma'
import { FROM_EMAIL_RESEND } from '@repo/helper'
import { resend } from '@repo/email'
import { z } from 'zod'

const schema = z.object({
  memberType: z.enum(['non-member', 'member', 'all']),
  subject: z.string(),
  html: z.string(),
})

export const manualEmail = trigger.defineJob({
  id: 'manual-email',
  name: 'Manual Email',
  version: '0.1.0',

  trigger: invokeTrigger({ schema }),

  run: async (payload, io, _ctx) => {
    const allUsers = await io.runTask('get-all-users', async () => {
      const users = await prisma.user.findMany({
        include: {
          membership: { take: 1, orderBy: [{ endDate: 'desc' }] },
        },
      })

      if (payload.memberType === 'member') {
        return users.filter((user) => user.membership[0] && new Date(user.membership[0].endDate) > new Date())
      }

      if (payload.memberType === 'non-member') {
        return users.filter((user) => !user.membership[0] || new Date(user.membership[0].endDate) <= new Date())
      }

      return users
    })

    for (const user of allUsers) {
      await io.runTask(
        `send-manual-email-${user.id}`,
        async () => {
          await resend.emails.send({
            from: FROM_EMAIL_RESEND,
            to: user.email,
            subject: payload.subject,
            html: payload.html,
          })
        },
        { retry: { limit: 2 } },
      )
    }
  },
})
