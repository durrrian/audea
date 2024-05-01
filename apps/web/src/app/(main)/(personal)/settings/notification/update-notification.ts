'use server'

import { currentProfile } from '@repo/clerk-action'
import { prisma } from '@repo/prisma'
import type { EmailNotification } from '@repo/prisma/client'

export async function updateNotification(data: Omit<EmailNotification, 'id' | 'userId'>) {
  try {
    const user = await currentProfile()

    if (!user) throw new Error('User not found!')

    const response = await prisma.emailNotification.update({ where: { userId: user.id }, data })

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
