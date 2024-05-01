import { cronTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { prisma } from '@repo/prisma'
import { FROM_EMAIL_RESEND } from '@repo/helper'
import NoticeMembershipHabisEmail from '@repo/email/templates/notice-membership-habis'
import ReminderMembershipAbisEmail from '@repo/email/templates/reminder-membership-abis'
import { resend } from '@repo/email'
import { Telegram } from '@repo/api'

export const cekStatusMembership = trigger.defineJob({
  id: 'cek-status-membership',
  name: 'Cek Status Membership',
  version: '0.1.0',

  trigger: cronTrigger({
    cron: '0 3 * * *',
  }),

  run: async (payload, io, _ctx) => {
    await io.logger.info('Received the scheduled event', {
      payload,
    })

    const now = new Date(payload.ts)

    const allUsers = await io.runTask('get-all-users', async () => {
      return prisma.user.findMany({
        include: { membership: { orderBy: [{ endDate: 'desc' }], take: 1 }, telegram: true, marketingData: true },
      })
    })

    for (const user of allUsers) {
      const membership = user.membership[0]

      if (!membership) continue

      await io.runTask(`update-user-${user.id}`, async () => {
        const telegram = user.telegram

        const membershipExpiryDate = new Date(membership.endDate)

        const daysUntilExpiry = Math.floor((membershipExpiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        if (daysUntilExpiry <= 7 && membership.reminderExpired === false) {
          await io.runTask(
            `send-reminder-email-${user.id}`,
            async () => {
              await resend.emails.send({
                from: FROM_EMAIL_RESEND,
                to: user.email,
                subject: 'Membership kamu sebentar lagi habis loh!',
                react: (
                  <ReminderMembershipAbisEmail
                    email={user.email}
                    name={user.name}
                    date={membershipExpiryDate.toISOString()}
                  />
                ),
              })

              await prisma.membership.update({ where: { id: membership.id }, data: { reminderExpired: true } })
            },
            { retry: { limit: 2 } },
          )
        }

        if (now >= membershipExpiryDate && membership.expiredNotice === false) {
          await io.runTask(
            `send-expired-email-${user.id}`,
            async () => {
              await resend.emails.send({
                from: FROM_EMAIL_RESEND,
                to: user.email,
                subject: 'Masa membership sudah habis 😞',
                react: (
                  <NoticeMembershipHabisEmail
                    email={user.email}
                    name={user.name}
                    date={membershipExpiryDate.toISOString()}
                  />
                ),
              })

              if (telegram) {
                const telegramOAuth = new Telegram(telegram.telegramUserId)
                await telegramOAuth.banChatMember()
              }

              await prisma.membership.update({ where: { id: membership.id }, data: { expiredNotice: true } })
            },
            { retry: { limit: 2 } },
          )
        }
      })
    }
  },
})
