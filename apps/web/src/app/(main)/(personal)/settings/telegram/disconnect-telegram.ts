'use server'

import { Telegram } from '@repo/api'
import { prisma } from '@repo/prisma'
import { cookies } from 'next/headers'

export async function disconnectTelegram(telegramId: string) {
  try {
    const telegramdb = await prisma.telegram.findFirstOrThrow({ where: { id: telegramId } })

    const telegram = new Telegram(telegramdb.telegramUserId)

    await telegram.banChatMember()

    const response = await prisma.telegram.delete({ where: { id: telegramdb.id } })

    cookies().delete({ domain: 'https://oauth.telegram.org', name: 'stel_ssid' })
    cookies().delete({ domain: 'https://oauth.telegram.org', name: 'stel_token' })

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
