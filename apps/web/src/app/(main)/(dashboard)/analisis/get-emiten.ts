'use server'

import { prisma } from '@repo/prisma'

export async function getEmiten(userId: string) {
  try {
    const allEmiten = await prisma.emiten.findMany({
      where: { analisis: { some: {} } },
      include: { analisis: { include: { watchAnalisis: { where: { userId }, take: 1 } } }, industry: true },
    })

    const sortedEmiten = allEmiten.sort((a, b) => {
      const aLatestAnalisis = a.analisis.reduce((latest, current) => {
        return latest.createdDate > current.createdDate ? latest : current
      })

      const bLatestAnalisis = b.analisis.reduce((latest, current) => {
        return latest.createdDate > current.createdDate ? latest : current
      })

      return bLatestAnalisis.createdDate.getTime() - aLatestAnalisis.createdDate.getTime()
    })

    return sortedEmiten
  } catch (error) {
    console.error(error)
    throw error
  }
}
