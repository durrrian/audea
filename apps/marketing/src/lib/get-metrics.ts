'use server'

import type { CummulativeStockData } from '@repo/api'
import { prisma } from '@repo/prisma'

export async function getMetrics(cummulativeStockData: CummulativeStockData) {
  try {
    const activeMember = await prisma.user.count({ where: { membership: { some: { endDate: { gte: new Date() } } } } })

    const returnVsIhsg = parseFloat(
      (
        cummulativeStockData[cummulativeStockData.length - 1]['Supercuan Saham'] -
        cummulativeStockData[cummulativeStockData.length - 1].IHSG
      ).toFixed(2),
    )
    const platinumMember = await prisma.user.count({ where: { membership: { some: { tier: 'PLATINUM' } } } })

    return { activeMember, returnVsIhsg, platinumMember }
  } catch (error) {
    console.error(error)
    throw error
  }
}
