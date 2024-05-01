import type { StockTransaction } from '@repo/prisma/client'

export type GetCurrentPortofolioGroupedData = Record<
  string,
  {
    items: StockTransaction[]
    totalBuyLot: number
    totalSellLot: number
    remainingShares: number
  }
>

/**
 * Return a grouped data and list of emiten array
 * from a list of transactions.
 *
 * There will be 3 this returned:
 * @type {GetCurrentPortofolioGroupedData} 1. groupedData: The grouped data
 * @type {string[]} 2. emitenIdList: string for ALL emiten that Alvin had or currently have
 * @type {string[]} 3. emitenPortofolioFiltered: string for CURRENT emiten
 */
export function getCurrentPortofolio(transactions: StockTransaction[]) {
  const transactionGroupedData: GetCurrentPortofolioGroupedData = {}

  transactions.forEach((transaction) => {
    const { emitenId, type, lot } = transaction

    if (!transactionGroupedData[emitenId]) {
      transactionGroupedData[emitenId] = {
        items: [],
        totalBuyLot: 0,
        totalSellLot: 0,
        remainingShares: 0,
      }
    }

    if (type === 'BUY') {
      transactionGroupedData[emitenId].totalBuyLot += lot
      transactionGroupedData[emitenId].remainingShares += lot
    } else if (type === 'SELL') {
      transactionGroupedData[emitenId].totalSellLot += lot
      transactionGroupedData[emitenId].remainingShares -= lot
    }

    transactionGroupedData[emitenId].items.push(transaction)
  })

  const emitenPortofolio = Object.keys(transactionGroupedData)

  const emitenPortofolioFiltered = emitenPortofolio.filter((v) => transactionGroupedData[v].remainingShares > 0)

  return { emitenIdList: emitenPortofolio, emitenPortofolioFiltered, groupedData: transactionGroupedData }
}
