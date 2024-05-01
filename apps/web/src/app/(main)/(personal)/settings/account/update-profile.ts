'use server'

import type { User } from '@repo/prisma/client'
import { prisma } from '@repo/prisma'

export async function updateProfile(userId: string, data: Pick<User, 'name' | 'whatsappNumber' | 'photoUrl'>) {
  try {
    await prisma.user.update({ where: { id: userId }, data })
  } catch (error) {
    console.error(error)
    throw error
  }
}
