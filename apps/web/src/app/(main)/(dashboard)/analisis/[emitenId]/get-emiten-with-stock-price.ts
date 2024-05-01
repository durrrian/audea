'use server'

import { prisma } from '@repo/prisma'

export async function getEmitenWithStockPrice(emitenId: string) {
  try {
    const emiten = await prisma.emiten.findFirstOrThrow({
      where: { id: emitenId },
      include: {
        industry: true,
        stockTransaction: true,
      },
    })

    const lot = emiten.stockTransaction.reduce((prev, curr) => {
      let currentLot = prev

      if (curr.type === 'BUY') {
        currentLot += curr.lot
      } else {
        currentLot -= curr.lot
      }

      return currentLot
    }, 0)

    return { emiten, lot }
  } catch (error) {
    console.error(error)
    throw error
  }
}
