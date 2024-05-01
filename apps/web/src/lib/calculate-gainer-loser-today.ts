import type { Emiten, StockTransaction } from '@repo/prisma/client'
import { getStockPrice, getCurrentPortofolio } from '@repo/api'

export async function calculateGainerLoserToday(allTransactions: StockTransaction[], allEmiten: Emiten[]) {
  try {
    const { emitenPortofolioFiltered } = getCurrentPortofolio(allTransactions)

    let date: string | null = null

    const allStockPrices = await Promise.all(
      emitenPortofolioFiltered.map(async (emitenId) => {
        const stockPrice = await getStockPrice({ type: 'id', emitenId })

        if (date === null) {
          date = stockPrice.date
        }

        const emiten = allEmiten.filter((v) => v.id === emitenId)[0]

        const currentStockPrice = stockPrice.currentPrice

        const openStockPrice = stockPrice.openPrice

        const obj = {
          Emiten: emiten.kodeEmiten,
          'Ptsl (+/-)': currentStockPrice - openStockPrice,
          'Ptsl (+/-) %': (currentStockPrice - openStockPrice) / currentStockPrice,
          'Last Price': currentStockPrice,
        }

        return obj
      }),
    )

    return { items: allStockPrices, date: (date as string | null) ?? '' }
  } catch (error) {
    console.error(error)
    throw error
  }
}
