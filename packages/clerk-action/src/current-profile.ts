'use server'

import { auth } from '@clerk/nextjs'
import { prisma } from '@repo/prisma'
import type { Membership, User } from '@repo/prisma/client'

export type CurrentProfile = User & { membership: Membership | null }

export const currentProfile: () => Promise<CurrentProfile | null> = async () => {
  try {
    const { userId: clerkUserId } = auth()

    if (!clerkUserId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      include: {
        membership: { take: 1, orderBy: [{ endDate: 'desc' }] },
      },
    })

    if (!user) {
      return null
    }

    const membership: Membership | null = user.membership[0] ?? null

    return { ...user, membership: membership }
  } catch (error) {
    console.error(error)
    throw error
  }
}
