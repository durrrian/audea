import type { Emiten, StockTransaction } from '@repo/prisma/client'
import { getStockPrice } from '../server-action/get-stock-price'
import { getCurrentPortofolio } from './get-current-portofolio'

export interface GainerLoser {
  Emiten: string
  'Ptsl (+/-)': number
  'Ptsl (+/-) %': number
  'Last Price': number
}

export async function calculateGainerLoserToday(
  allTransactions: StockTransaction[],
  allEmiten: Emiten[],
): Promise<{ items: GainerLoser[]; date: string }> {
  try {
    const { emitenPortofolioFiltered } = getCurrentPortofolio(allTransactions)

    let date = ''

    const allStockPrices = await Promise.all(
      emitenPortofolioFiltered.map(async (emitenId) => {
        const stockPrice = await getStockPrice({ type: 'id', emitenId })

        if (date === '') {
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

    return { items: allStockPrices, date }
  } catch (error) {
    console.error(error)
    throw error
  }
}
