import { invokeTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { FROM_EMAIL_RESEND } from '@repo/helper'
import { resend } from '@repo/email'
import { z } from 'zod'
import { TELEGRAM_LINK, Telegram } from '@repo/api'
import NotifikasiTelegramEmail from '@repo/email/templates/notifikasi-telegram'

const schema = z.object({
  name: z.string(),
  email: z.string(),
  telegramUserId: z.string(),
})

export const sendTelegramSuccessMessage = trigger.defineJob({
  id: 'send-telegram-success-message',
  name: 'Send Telegram Success Message',
  version: '0.1.0',

  //@ts-ignore
  trigger: invokeTrigger({ schema }),

  run: async (payload, io, _ctx) => {
    await io.runTask(
      `send-telegram-success-message-to${payload.name}`,
      async () => {
        const replyMessage = `👋🏼 Hi, ${payload.name},\n\nKamu sudah berhasil connect Telegram, sehingga kamu bisa tanya-tanya ke Bot Supercuan Saham terkait performa dan membership kamu.\n\nKamu bisa menggunakan command:\n1. /portofolio - Lihat seluruh portofolio saham Supercuan Saham yang terkini\n2. /metrics - Intip performa Supercuan Saham\n3. /transaction - Kepoin transaksi Supercuan Saham\n4. /dividen - Pantau emiten Supercuan Saham yang bagi-bagi dividen\n5. /emiten - Cari tau lebih dalam tentang emiten favoritmu (format: $BBCA)\n6. /member - Cek membership status Supercuan Saham kamu\n\nKami saranin kamu juga masuk ke Channel Telegram Supercuan Saham melalui link ${TELEGRAM_LINK}.`

        const telegram = new Telegram(payload.telegramUserId)
        await telegram.sendMessage(replyMessage)

        await resend.emails.send({
          from: FROM_EMAIL_RESEND,
          to: payload.email,
          subject: 'Akun Telegram Kamu Berhasil Terhubung!',
          react: <NotifikasiTelegramEmail email={payload.email} name={payload.name} />,
        })
      },
      { retry: { limit: 2 } },
    )
  },
})
