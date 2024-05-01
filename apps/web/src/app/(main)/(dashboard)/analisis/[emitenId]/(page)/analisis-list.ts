'use server'

import { prisma } from '@repo/prisma'

export async function analisisList(emitenId: string, userId: string) {
  try {
    const emiten = await prisma.emiten.findFirst({
      where: { id: emitenId },
      include: { analisis: { include: { watchAnalisis: { where: { userId } } }, orderBy: { createdDate: 'desc' } } },
    })

    if (!emiten || emiten.analisis.length === 0) return null

    return emiten
  } catch (error) {
    console.error(error)
    throw error
  }
}
