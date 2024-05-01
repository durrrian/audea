'use server'

// eslint-disable-next-line unicorn/prefer-node-protocol -- required for crypto
import * as crypto from 'crypto'
import { prisma } from '@repo/prisma'
import { Telegram } from '@repo/api'
import { sendTelegramSuccessMessage } from '@repo/trigger'
import { currentProfile } from '@repo/clerk-action'

export interface TelegramData {
  hash: string
  telegram_id: string
  first_name: string
  auth_date: string
  last_name: string | undefined
  username: string | undefined
  photo_url: string | undefined
}

export async function verifyTelegram(data: TelegramData) {
  try {
    const user = await currentProfile()

    if (!user || !user.membership || new Date() >= new Date(user.membership.endDate))
      throw new Error('User is not active')

    const authDate = data.auth_date
    const firstName = data.first_name
    const lastName = data.last_name
    const telegramId = data.telegram_id
    const username = data.username
    const photoUrl = data.photo_url
    const hash = data.hash

    const receivedData: Record<string, string> = {
      auth_date: authDate,
      first_name: firstName,
      id: telegramId,
    }

    if (username) receivedData.username = username
    if (photoUrl) receivedData.photo_url = photoUrl
    if (lastName) receivedData.last_name = lastName

    const keys = Object.keys(receivedData).sort()
    const dataCheckString = keys.map((key) => `${key}=${receivedData[key]}`).join('\n')

    const secretKey = crypto.createHash('sha256').update(String(process.env.TELEGRAM_BOT_TOKEN)).digest('hex')
    const hmac = crypto.createHmac('sha256', Buffer.from(secretKey, 'hex'))
    hmac.update(dataCheckString)
    const calculatedHash = hmac.digest('hex')

    if (calculatedHash !== hash) {
      throw new Error('Hash not match')
    }

    const telegramdb = await prisma.telegram.create({
      data: {
        userId: user.id,
        auth_date: new Date(Number(authDate) * 1000),
        first_name: firstName,
        last_name: lastName,
        telegramUserId: telegramId,
        username,
        photo_url: photoUrl,
      },
    })

    const telegram = new Telegram(telegramdb.telegramUserId)

    await telegram.unbanChatMember()

    await sendTelegramSuccessMessage.invoke({
      name: user.name,
      email: user.email,
      telegramUserId: telegramdb.telegramUserId,
    })

    return telegramdb
  } catch (error) {
    console.error(error)
    throw error
  }
}
