import { invokeTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { FROM_EMAIL_RESEND } from '@repo/helper'
import { resend } from '@repo/email'
import { render } from '@repo/email/render'
import { z } from 'zod'
import NewMemberEmail from '@repo/email/templates/welcome-new-member'
import LookWhosBackEmail from '@repo/email/templates/look-whos-back'
import ThankYouForPerpanjangEmail from '@repo/email/templates/thankyou-for-perpanjang'
import ThankYouForUpgradingEmail from '@repo/email/templates/thankyou-for-upgrading'
import { createElement } from 'react'

const schema = z.object({
  user: z.object({ name: z.string(), email: z.string() }),
  type: z.enum(['new-member', 'perpanjang', 'upgrading', 'look-whos-back']),
  membership: z.object({ tier: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']), endDate: z.string() }),
})

export const sendEmailNewMembership = trigger.defineJob({
  id: 'send-email-new-membership',
  name: 'Send Email New Membership',
  version: '0.1.0',

  trigger: invokeTrigger({ schema }),

  run: async (payload, io, _ctx) => {
    await io.runTask(
      `send-new-membership-email-${payload.user.email}`,
      async () => {
        if (payload.type === 'new-member') {
          const template = createElement(NewMemberEmail, {
            tier: payload.membership.tier,
            email: payload.user.email,
            name: payload.user.name,
            date: new Date(payload.membership.endDate).toISOString(),
          })

          await resend.emails.send({
            from: FROM_EMAIL_RESEND,
            to: payload.user.email,
            subject: 'Selamat Bergabung di Supercuan Saham!',
            html: render(template),
            text: render(template, { plainText: true }),
          })
        }

        if (payload.type === 'perpanjang') {
          const template = createElement(ThankYouForPerpanjangEmail, {
            tier: payload.membership.tier,
            email: payload.user.email,
            name: payload.user.name,
            date: new Date(payload.membership.endDate).toISOString(),
          })

          await resend.emails.send({
            from: FROM_EMAIL_RESEND,
            to: payload.user.email,
            subject: 'Perpanjang membership berhasil',
            html: render(template),
            text: render(template, { plainText: true }),
          })
        }

        if (payload.type === 'look-whos-back') {
          const template = createElement(LookWhosBackEmail, {
            tier: payload.membership.tier,
            email: payload.user.email,
            name: payload.user.name,
            date: new Date(payload.membership.endDate).toISOString(),
          })

          await resend.emails.send({
            from: FROM_EMAIL_RESEND,
            to: payload.user.email,
            subject: 'Selamat datang kembali ke Supercuan Saham Membership!',
            html: render(template),
            text: render(template, { plainText: true }),
          })
        }

        if (payload.type === 'upgrading') {
          const template = createElement(ThankYouForUpgradingEmail, {
            tier: payload.membership.tier,
            email: payload.user.email,
            name: payload.user.name,
            date: new Date(payload.membership.endDate).toISOString(),
          })

          await resend.emails.send({
            from: FROM_EMAIL_RESEND,
            to: payload.user.email,
            subject: 'Upgrade membership berhasil',
            html: render(template),
            text: render(template, { plainText: true }),
          })
        }
      },
      { retry: { limit: 2 } },
    )
  },
})
