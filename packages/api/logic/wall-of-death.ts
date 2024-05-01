import type { Emiten, StockTransaction } from '@repo/prisma/client'
import { getStockPrice } from '../server-action/get-stock-price'

export type GroupedDataWallOfDeath = Record<
  string,
  {
    totalBuyLot: number
    totalSellLot: number
    totalBuyingPrice: number
    totalSellingPrice: number
    averageBuyingPrice: number
    averageSellingPrice: number
    lastTransaction: string | Date
    lastPrice: number
    items: StockTransaction[]
    emitenCode: Emiten['kodeEmiten']
  }
>

export interface WallOfDeathColumns {
  Emiten: Emiten['kodeEmiten']
  'Avg buy price': number
  'Avg sell price': number
  'Last price': number
  'Time of sell': Date
}

export async function makeWallOfDeath(
  allTransactions: StockTransaction[],
  allEmiten: Emiten[],
): Promise<WallOfDeathColumns[]> {
  const transactionGroupedData: GroupedDataWallOfDeath = {}

  allTransactions.forEach((transaction) => {
    const { emitenId, type, lot, price } = transaction

    if (!transactionGroupedData[emitenId]) {
      transactionGroupedData[emitenId] = {
        items: [],
        totalBuyLot: 0,
        totalSellLot: 0,
        totalBuyingPrice: 0,
        totalSellingPrice: 0,
        averageBuyingPrice: 0,
        averageSellingPrice: 0,
        lastTransaction: '',
        lastPrice: 0,
        emitenCode: '',
      }
    }

    transactionGroupedData[emitenId].items.push(transaction)

    if (type === 'BUY') {
      transactionGroupedData[emitenId].totalBuyingPrice += lot * price
      transactionGroupedData[emitenId].totalBuyLot += transaction.lot
    } else if (type === 'SELL') {
      transactionGroupedData[emitenId].totalSellLot += transaction.lot
      transactionGroupedData[emitenId].totalSellingPrice += lot * price
    }
  })

  for (const emitenId in transactionGroupedData) {
    const perEmiten = transactionGroupedData[emitenId]

    const emiten = allEmiten.find((v) => v.id === emitenId)

    if (!emiten) throw new Error('emiten is not available')

    const buyMinusSell = perEmiten.totalBuyLot - perEmiten.totalSellLot

    if (buyMinusSell === 0) {
      perEmiten.averageBuyingPrice = Math.floor(perEmiten.totalBuyingPrice / perEmiten.totalBuyLot)
      perEmiten.averageSellingPrice = Math.ceil(perEmiten.totalSellingPrice / perEmiten.totalSellLot)

      const stockPrice = await getStockPrice({ type: 'code', emitenCode: emiten.kodeEmiten })

      perEmiten.lastPrice = stockPrice.currentPrice
      perEmiten.lastTransaction = perEmiten.items.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
      )[0].time

      perEmiten.emitenCode = emiten.kodeEmiten
    }
  }

  const result: WallOfDeathColumns[] = Object.entries(transactionGroupedData)
    .filter(([_, item]) => {
      return item.totalBuyLot - item.totalSellLot === 0
    })
    .map(([_, item]) => {
      return {
        Emiten: item.emitenCode,
        'Avg buy price': item.averageBuyingPrice,
        'Avg sell price': item.averageSellingPrice,
        'Last price': item.lastPrice,
        'Time of sell': new Date(item.lastTransaction),
      }
    })

  return result
}
