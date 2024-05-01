'use server'

import { prisma } from '@repo/prisma'
import type { StockTransaction, Emiten } from '@repo/prisma/client'

export type Items = Record<string, (StockTransaction & { emiten: Emiten })[]>

export type TransactionGroupedData = Record<string, Items>

export async function getTransaction() {
  try {
    const stockTransaction = await prisma.stockTransaction.findMany({
      orderBy: [{ time: 'desc' }],
      include: { emiten: true },
    })

    const groupedData = {} as TransactionGroupedData

    stockTransaction.forEach((item) => {
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
