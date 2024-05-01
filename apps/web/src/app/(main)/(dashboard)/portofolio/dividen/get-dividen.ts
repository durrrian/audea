'use server'

import { prisma } from '@repo/prisma'
import { getCurrentPortofolio } from '@repo/api'
import { type StockDivident, type Emiten } from '@repo/prisma/client'

export type Items = Record<string, (StockDivident & { emiten: Emiten; shares: number; dividentNumber: number })[]>

export type DividentGroupedData = Record<string, Items>

export async function getDividen() {
  try {
    const allTransactions = await prisma.stockTransaction.findMany({
      orderBy: [{ time: 'desc' }],
    })

    const stockDivident = await prisma.stockDivident.findMany({
      orderBy: [{ time: 'desc' }],
      include: { emiten: true },
    })

    const allDivident = stockDivident.map((v) => {
      const transactionBasedOnDate = allTransactions.filter((y) => new Date(y.time) <= new Date(v.time))

      const { groupedData: groupedDataBasedOnDate } = getCurrentPortofolio(transactionBasedOnDate)

      const remainingShares = groupedDataBasedOnDate[v.emiten.id].remainingShares * 100

      const dividentNumber = remainingShares * v.dps

      return {
        ...v,
        shares: remainingShares,
        dividentNumber,
      }
    })

    const groupedData = {} as DividentGroupedData

    allDivident.forEach((item) => {
      const time = new Date(item.time)
      const yearMonth = `${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart(2, '0')}`
      const yearMonthDate = `${yearMonth}-${time.getDate().toString().padStart(2, '0')}`

      if (!groupedData[yearMonth]) {
        groupedData[yearMonth] = {}
      }

      if (!groupedData[yearMonth][yearMonthDate]) {
        groupedData[yearMonth][yearMonthDate] = []
      }

      groupedData[yearMonth][yearMonthDate].push(item)
    })

    return groupedData
  } catch (error) {
    console.error(error)
    throw error
  }
}
