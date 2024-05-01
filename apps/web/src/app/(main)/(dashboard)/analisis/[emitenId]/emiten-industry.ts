'use server'

import { prisma } from '@repo/prisma'

export async function emitenIndustry(emitenId: string) {
  try {
    const emiten = await prisma.emiten.findFirstOrThrow({ where: { id: emitenId }, include: { industry: true } })

    return emiten
  } catch (error) {
    console.error(error)
    throw error
  }
}
