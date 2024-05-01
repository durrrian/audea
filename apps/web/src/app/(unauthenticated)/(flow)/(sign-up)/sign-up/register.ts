'use server'

import type { MarketingData, User } from '@repo/prisma/client'
import { prisma } from '@repo/prisma'

export async function register(
  data: Pick<User, 'clerkUserId' | 'email' | 'name' | 'whatsappNumber'>,
  marketingData: Pick<MarketingData, 'knowOrigin'>,
) {
  try {
    const user = await prisma.user.create({ data })

    await prisma.marketingData.create({ data: { ...marketingData, userId: user.id } })

    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}
