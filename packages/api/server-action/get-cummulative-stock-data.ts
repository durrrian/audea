'use server'

import { prisma } from '@repo/prisma'

export type CummulativeStockData = {
  name: string
  IHSG: number
  'Supercuan Saham': number
}[]

export async function getCummulativeStockData() {
  try {
    const stockData = await prisma.returnVsIndex.findMany({ orderBy: [{ endPeriod: 'asc' }] })

    let cumulativeSupercuan = 0
    let cumulativeIhsg = 0

    const cummulativeStockData = stockData.map((v) => {
      cumulativeSupercuan += v.supercuan
      cumulativeIhsg += v.ihsg

      // Format cumulative values to two decimal places using toFixed()
      const formattedCumulativeSupercuan = parseFloat(cumulativeSupercuan.toFixed(2))
      const formattedCumulativeIhsg = parseFloat(cumulativeIhsg.toFixed(2))

      return {
        name: v.period,
        IHSG: formattedCumulativeIhsg,
        'Supercuan Saham': formattedCumulativeSupercuan,
      }
    })

    return cummulativeStockData
  } catch (error) {
    console.error(error)
    throw error
  }
}
