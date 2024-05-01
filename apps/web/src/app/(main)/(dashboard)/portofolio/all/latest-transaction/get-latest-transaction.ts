'use server'

import { prisma } from '@repo/prisma'

export async function getLatestTransaction() {
  try {
    const latestBuy = await prisma.stockTransaction.findMany({
      orderBy: { time: 'desc' },
      where: { type: 'BUY' },
      take: 3,
      include: { emiten: true },
    })

    const latestSell = await prisma.stockTransaction.findMany({
      orderBy: { time: 'desc' },
      where: { type: 'SELL' },
      take: 3,
      include: { emiten: true },
    })

    const lastThreeArr = [
      { name: '3 Saham terakhir yang dibeli', items: latestBuy },
      { name: '3 Saham terakhir yang dijual', items: latestSell },
    ]

    return lastThreeArr
  } catch (error) {
    console.error(error)
    throw error
  }
}
