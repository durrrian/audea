import { cronTrigger } from '@trigger.dev/sdk'
import { trigger } from '../../trigger'
import { prisma } from '@repo/prisma'
import { getCurrentPortofolio } from '@repo/api'
import { getStockPrice } from '@repo/api'

export const dailyReturn = trigger.defineJob({
  id: 'daily-return',
  name: 'Daily Return',
  version: '0.1.0',

  trigger: cronTrigger({
    cron: '0 11 * * 1-5',
  }),

  run: async (payload, io, _ctx) => {
    await io.logger.info('Received the scheduled event', {
      payload,
    })

    const now = new Date(payload.ts)

    const allStockTransactionsUpToNow = await io.runTask('get-all-transaction-up-to-now', async () => {
      return prisma.stockTransaction.findMany({
        orderBy: [{ time: 'desc' }],
        where: { time: { lte: now } },
      })
    })

    const allDividentsUpToNow = await io.runTask('get-all-dividfent-up-to-now', async () => {
      return prisma.stockDivident.findMany({
        where: { time: { lte: now } },
        orderBy: [{ time: 'desc' }],
      })
    })

    const todayStockTransaction = await io.runTask('get-today-transaction', async () => {
      return allStockTransactionsUpToNow.filter((v) => {
        const isTheSameDay = new Date(v.time).getUTCDate() === now.getUTCDate()
        const isTheSameMonth = new Date(v.time).getUTCMonth() === now.getUTCMonth()
        const isTheSameYear = new Date(v.time).getUTCFullYear() === now.getUTCFullYear()

        return isTheSameDay && isTheSameMonth && isTheSameYear
      })
    })

    const realizedProfit = await io.runTask('calculate-realized-profit', async () => {
      let realizedProfit = 0
      for (const transaction of todayStockTransaction) {
        if (transaction.type === 'SELL') {
          realizedProfit += transaction.lot * 100 * transaction.price
        }
      }

      return realizedProfit
    })

    const dividentIncome = await io.runTask('calculate-divident-income', async () => {
      let dividentIncome = 0

      allDividentsUpToNow
        .filter((v) => {
          const isTheSameDay = new Date(v.time).getUTCDate() === now.getUTCDate()
          const isTheSameMonth = new Date(v.time).getUTCMonth() === now.getUTCMonth()
          const isTheSameYear = new Date(v.time).getUTCFullYear() === now.getUTCFullYear()

          return isTheSameDay && isTheSameMonth && isTheSameYear
        })
        .forEach((divident) => {
          const allStockTransactionsUpToDividentDate = allStockTransactionsUpToNow.filter(
            (v) => new Date(v.time) <= new Date(divident.time),
          )

          const { groupedData: groupedDataUpToDividentDate } = getCurrentPortofolio(
            allStockTransactionsUpToDividentDate,
          )
          const remainingShares = groupedDataUpToDividentDate[divident.emitenId].remainingShares * 100 // remainingShares is still in lot

          const dividentNumber = remainingShares * divident.dps

          dividentIncome += dividentNumber
        })

      return dividentIncome
    })

    const groupedData = await io.runTask('get-current-portofolio', async () => {
      const { groupedData } = getCurrentPortofolio(allStockTransactionsUpToNow)

      return groupedData
    })

    const allStockPricesWithEmitenId = await io.runTask('get-stock-prices-with-emitenId', async () => {
      const allStockPricesWithEmitenId: { emitenId: string; currentStockPrice: number }[] = []

      for (const emitenId of Object.keys(groupedData)) {
        const obj = await io.runTask(`get-stock-price-${emitenId}`, async () => {
          const stockPrice = await getStockPrice({ type: 'id', emitenId })

          const currentStockPrice = stockPrice.currentPrice

          const obj = {
            emitenId,
            currentStockPrice,
          }

          return obj
        })

        allStockPricesWithEmitenId.push(obj)
      }

      return allStockPricesWithEmitenId
    })

    const currentFloatingProfit = await io.runTask('calculate-current-floating-profit', async () => {
      let currentFloatingProfit = 0

      for (const emitenId in groupedData) {
        const perEmiten = groupedData[emitenId]

        if (perEmiten.remainingShares === 0) continue

        const todayStockPrice = allStockPricesWithEmitenId.filter((v) => v.emitenId === emitenId)[0]

        /**
         * lot skrg * last price - (lot beli * harga beli - lot jual * average harga beli)
         * A - (B - C)
         */

        /**
         * A
         */
        const A = perEmiten.remainingShares * 100 * todayStockPrice.currentStockPrice

        /**
         * B
         */
        let B = 0
        let totalBuyingPrice = 0
        let totalBuyingLot = 0
        for (const item of perEmiten.items) {
          if (item.type === 'BUY') {
            B += item.lot * 100 * item.price
            totalBuyingPrice += item.price * item.lot
            totalBuyingLot += item.lot
          }
        }

        /**
         * C
         */
        const averageHargaBeli = totalBuyingPrice / totalBuyingLot
        const C = perEmiten.totalSellLot * 100 * averageHargaBeli

        const floatingProfit = A - (B - C)

        currentFloatingProfit += floatingProfit

        // console.log((await prisma.emiten.findUnique({ where: { id: emitenId } }))?.kodeEmiten)
        // console.table({ A: rupiah(A), B: rupiah(B), C: rupiah(C) })
      }

      return currentFloatingProfit
    })

    const totalAssetValue = await io.runTask('calculate-total-asset-value', async () => {
      let totalAssetValue = 0
      for (const emitenId in groupedData) {
        const perEmiten = groupedData[emitenId]

        const todayStockPrice = allStockPricesWithEmitenId.find((v) => v.emitenId === emitenId)

        if (!todayStockPrice) throw new Error('Could not calculate totalAssetValue')

        totalAssetValue += perEmiten.remainingShares * 100 * todayStockPrice.currentStockPrice
      }

      return totalAssetValue
    })

    const previousReturnData = await io.runTask('get-previous-return-data', async () => {
      const returnData = await prisma.returnData.findMany({ orderBy: { date: 'desc' }, take: 1 })

      return returnData[0]
    })

    const calculatedData = await io.runTask('calculate-data', async () => {
      const totalAssetValueWithoutDeposit =
        previousReturnData.totalAssetValue +
        (currentFloatingProfit - previousReturnData.currentFloatingProfit) +
        realizedProfit +
        dividentIncome

      const totalCashDeposited = totalAssetValue - totalAssetValueWithoutDeposit

      const yieldd =
        ((totalAssetValueWithoutDeposit - previousReturnData.totalAssetValue) / previousReturnData.totalAssetValue) *
        100

      const returnData = { totalAssetValueWithoutDeposit, totalCashDeposited, yield: yieldd }

      return returnData
    })

    await io.logger.info('Finish calculating', calculatedData)

    const response = await io.runTask('create-return-data', async () => {
      const response = await prisma.returnData.create({
        data: {
          totalAssetValue,
          dividentIncome,
          currentFloatingProfit,
          realizedProfit,
          date: (() => {
            const date = new Date()

            date.setUTCDate(now.getUTCDate())
            date.setUTCMonth(now.getUTCMonth())
            date.setUTCFullYear(now.getUTCFullYear())
            date.setUTCHours(0)
            date.setUTCMinutes(0)
            date.setUTCSeconds(0)
            date.setUTCMilliseconds(0)

            return date
          })(),
          totalCashDeposited: calculatedData.totalCashDeposited,
          totalAssetValueWithoutDeposit: calculatedData.totalAssetValueWithoutDeposit,
          yield: calculatedData.yield,
        },
      })

      return response
    })

    return response
  },
})
