import type { Emiten, StockTransaction } from '@repo/prisma/client'
import { getStockPrice } from '../server-action/get-stock-price'

export interface PortofolioColumns {
  Emiten: Emiten['kodeEmiten']
  Lot: number
  'Avg Price': number
  'Change (lot)': string | null
  'Last Price': number
  Value: number
  'Ptsl (+/-)': number
  'Ptsl (+/-) %': number
  'Weight %': number
}

type TransactionGroupedData = Record<string, StockTransaction[]>

type Portofolio = {
  [kodeEmiten: Emiten['kodeEmiten']]: {
    totalLot: number
    totalBuyLot: number
    averagePrice: number
    changeLot: null | string
    lastPrice: number
    value: number
    pointsChange: number
    pointsChangePercent: number
    weight: number
    totalBuyingPrice: number
  }
}

export async function makePortofolio(allTransactions: StockTransaction[], allEmiten: Emiten[]) {
  try {
    const transactionGroupedData: TransactionGroupedData = {}
    const groupedData: Portofolio = {}
    let totalPortofolioValue = 0

    allTransactions.forEach((transaction) => {
      const { emitenId, type, lot, price: buyingPrice } = transaction
      const emiten = allEmiten.find((emit) => emit.id === emitenId)

      if (emiten) {
        const emitenCode = emiten.kodeEmiten

        const transactionTime = transaction.time
        const date = `${transactionTime.getUTCDate()}-${
          transactionTime.getUTCMonth() + 1
        }-${transactionTime.getUTCFullYear()}`

        if (!transactionGroupedData[date]) {
          transactionGroupedData[date] = []
        }
        transactionGroupedData[date].push(transaction)

        if (!groupedData[emitenCode]) {
          groupedData[emitenCode] = {
            totalLot: 0,
            totalBuyLot: 0,
            totalBuyingPrice: 0,
            averagePrice: 0,
            changeLot: null,
            lastPrice: 0,
            value: 0,
            pointsChange: 0,
            pointsChangePercent: 0,
            weight: 0,
          }
        }

        if (type === 'BUY') {
          groupedData[emitenCode].totalLot += lot
          groupedData[emitenCode].totalBuyLot += lot
          groupedData[emitenCode].totalBuyingPrice += lot * buyingPrice
        } else if (type === 'SELL') {
          groupedData[emitenCode].totalLot -= lot
          // groupedData[emitenCode].totalBuyingPrice -= lot * buyingPrice
        }
      }
    })

    const latestTransaction = transactionGroupedData[Object.keys(transactionGroupedData)[0]]

    for (const emitenCode in groupedData) {
      const group = groupedData[emitenCode]

      if (group.totalLot === 0) continue

      group.averagePrice = Math.floor(group.totalBuyingPrice / group.totalBuyLot)
      const emiten = allEmiten.filter((emit) => emit.kodeEmiten === emitenCode)[0]

      const stockPrice = await getStockPrice({ type: 'code', emitenCode: emiten.kodeEmiten })

      // eslint-disable-next-line require-atomic-updates
      group.lastPrice = stockPrice.currentPrice
      group.value = group.lastPrice * group.totalLot * 100
      group.pointsChange = group.value - group.averagePrice * group.totalLot * 100
      group.pointsChangePercent = (group.lastPrice - group.averagePrice) / group.averagePrice

      totalPortofolioValue += group.value

      latestTransaction.forEach((v) => {
        const emiten = allEmiten.find((emit) => emit.id === v.emitenId)

        if (emiten && emiten.kodeEmiten === emitenCode) {
          group.changeLot = `${v.type === 'BUY' ? '+' : '-'}${v.lot}`
        }
      })
    }

    const result = Object.entries(groupedData)
      .map(([emitenCode, item]) => {
        return {
          Emiten: emitenCode,
          Lot: item.totalLot,
          'Avg Price': item.averagePrice,
          'Change (lot)': item.changeLot,
          'Last Price': item.lastPrice,
          Value: item.value,
          'Ptsl (+/-)': item.pointsChange,
          'Ptsl (+/-) %': item.pointsChangePercent,
          'Weight %': item.value / totalPortofolioValue,
        }
      })
      .filter((v) => v.Lot > 0)

    return { result, totalPortofolioValue }
  } catch (error) {
    console.error(error)
    throw error
  }
}
