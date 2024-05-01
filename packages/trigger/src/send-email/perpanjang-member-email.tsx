import { invokeTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { FROM_EMAIL_RESEND } from '@repo/helper'
import Email from '@repo/email/templates/thankyou-for-perpanjang'
import { resend } from '@repo/email'
import { z } from 'zod'

const schema = z.object({
  email: z.string(),
  name: z.string(),
  tier: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']),
  date: z.string(),
})

export const perpanjangMemberEmail = trigger.defineJob({
  id: 'perpanjang-member-email',
  name: 'Perpanjang Member Email',
  version: '0.1.0',

  trigger: invokeTrigger({ schema }),

  run: async (payload, io, _ctx) => {
    await io.runTask(
      'send-perpanjang-member-email',
      async () => {
        await resend.emails.send({
          from: FROM_EMAIL_RESEND,
          to: payload.email,
          subject: 'Perpanjang membership berhasil',
          react: (
            <Email
              email={payload.email}
              name={payload.name}
              tier={payload.tier}
              date={new Date(payload.date).toISOString()}
            />
          ),
        })
      },
      { retry: { limit: 2 } },
    )
  },
})
