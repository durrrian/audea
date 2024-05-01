'use server'

import { prisma } from '@repo/prisma'

export async function getNonEmitenList(userId: string) {
  try {
    const analisisNonEmiten = await prisma.analisisNonEmiten.findMany({
      include: { watchAnalisisNonEmiten: { where: { userId }, take: 1 } },
    })

    return analisisNonEmiten
  } catch (error) {
    console.error(error)
    throw error
  }
}
