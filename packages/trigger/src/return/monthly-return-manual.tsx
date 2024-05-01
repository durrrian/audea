import { invokeTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { prisma } from '@repo/prisma'
import { FROM_EMAIL_RESEND } from '@repo/helper'
import { resend } from '@repo/email'
import { z } from 'zod'
import Email from '@repo/email/templates/monthly-recap'
import { getIndexReturn } from './lib/get-index-return'

const schema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  period: z.string(),
  supercuanReturn: z.number(),
  cash: z.number(),
})

export const monthlyReturnManual = trigger.defineJob({
  id: 'monthly-return-manual',
  name: 'Monthly Return Manual',
  version: '0.1.0',

  trigger: invokeTrigger({ schema }),

  run: async (payload, io, _ctx) => {
    const index = await io.runTask(
      'get-index-return',
      async () => {
        const startDate = new Date(payload.startDate)
        const endDate = new Date(payload.endDate)

        const ihsgReturn = await getIndexReturn('IHSG', startDate, endDate)
        const lq45Return = await getIndexReturn('LQ45', startDate, endDate)

        const ihsg = Math.round(ihsgReturn * 100) / 100
        const lq45 = Math.round(lq45Return * 100) / 100

        return { ihsg, lq45 }
      },
      { retry: { limit: 3 } },
    )

    await io.logger.info('Index successfully fetched', index)

    const returnData = await io.runTask('push-to-database-monthly-return', async () => {
      const startPeriod = new Date(payload.startDate)
      startPeriod.setUTCHours(9, 0, 0)

      const endPeriod = new Date(payload.endDate)
      endPeriod.setUTCHours(9, 0, 0)

      const response = await prisma.returnVsIndex.create({
        data: {
          startPeriod,
          endPeriod,
          ihsg: index.ihsg,
          lq45: index.lq45,
          period: payload.period,
          supercuan: payload.supercuanReturn,
        },
      })

      return { ...response, cash: payload.cash }
    })

    const allUsers = await io.runTask('get-all-users', async () => {
      const users = await prisma.user.findMany({
        include: {
          membership: { take: 1, orderBy: [{ endDate: 'desc' }] },
          emailNotification: true,
        },

        where: { OR: [{ email: 'furqon@durrrian.com' }, { email: 'rizqy@durrrian.com' }] },
      })

      const finalUsers = users.filter((user) => {
        const membership = user.membership[0]
        const notification = user.emailNotification

        return membership && new Date(membership.endDate) > new Date() && notification && notification.monthlyRecap
      })

      return finalUsers
    })

    for (const user of allUsers) {
      await io.runTask(
        `send-monthly-return-email-${user.id}`,
        async () => {
          await resend.emails.send({
            from: FROM_EMAIL_RESEND,
            to: user.email,
            subject: 'Laporan bulanan Supercuan Saham!',
            react: (
              <Email
                email={user.email}
                name={user.name}
                cash={returnData.cash}
                endPeriod={new Date(returnData.endPeriod).toISOString()}
                supercuan={returnData.supercuan}
                ihsg={returnData.ihsg}
                lq45={returnData.lq45}
              />
            ),
          })
        },
        { retry: { limit: 2 } },
      )
    }
  },
})
