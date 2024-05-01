import { invokeTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { prisma } from '@repo/prisma'
import { endAndStartPeriod } from './lib/end-and-start-period'
import { getIndexReturn } from './lib/get-index-return'
import { FROM_EMAIL_RESEND, nameOfMonthLong } from '@repo/helper'
import Email from '@repo/email/templates/monthly-recap'
import { resend } from '@repo/email'

export const monthlyReturnAuto = trigger.defineJob({
  id: 'monthly-return-auto',
  name: 'Monthly Return',
  version: '0.1.0',

  // trigger: cronTrigger({
  //   cron: '10 7 1 * *',
  // }),

  trigger: invokeTrigger(),

  run: async (payload, io, _ctx) => {
    await io.logger.info('Received the scheduled event', {
      payload,
    })

    const { endPeriod: endDate, startPeriod: startDate } = endAndStartPeriod('monthly')

    const index = await io.runTask(
      'get-index-return',
      async () => {
        const ihsgReturn = await getIndexReturn('IHSG', startDate, endDate)
        const lq45Return = await getIndexReturn('LQ45', startDate, endDate)

        const ihsg = Math.round(ihsgReturn * 100) / 100
        const lq45 = Math.round(lq45Return * 100) / 100

        return { ihsg, lq45 }
      },
      { retry: { limit: 3 } },
    )

    const returnData = await io.runTask(
      'get-supercuan-return',
      async () => {
        const startPeriod = new Date(startDate)
        startPeriod.setUTCHours(0, 0, 0, 0)

        const endPeriod = new Date(endDate)
        endPeriod.setUTCHours(0, 0, 0, 0)

        const allReturn = await prisma.returnData.findMany({
          where: { date: { gte: startPeriod, lte: endPeriod } },
          orderBy: { date: 'asc' },
        })

        let yieldd = 0

        for (const returnData of allReturn) {
          yieldd += returnData.yield
        }

        const response = await prisma.returnVsIndex.create({
          data: {
            startPeriod,
            endPeriod,
            ihsg: index.ihsg,
            lq45: index.lq45,
            period: `${nameOfMonthLong[endPeriod.getUTCMonth()]} ${endPeriod.getUTCFullYear()}`,
            supercuan: yieldd,
          },
        })

        const cash = await prisma.cash.aggregate({ _sum: { amount: true } })

        return { ...response, cash: cash._sum.amount ?? 0 }
      },
      { retry: { limit: 3 } },
    )

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
