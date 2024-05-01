import { indonesiaStockMarketTime } from './indonesia-stock-market-time'

export type ReturnType = 'daily' | 'weekly' | 'monthly'

/**
 * Get the end and start period of a particular time for
 * calculating the return.
 */

export function endAndStartPeriod(returnType: ReturnType) {
  const today = new Date()
  const endPeriod = indonesiaStockMarketTime(today)

  let startPeriod: Date

  if (returnType === 'daily') {
    const startPeriodDate = new Date(endPeriod)
    startPeriodDate.setUTCDate(startPeriodDate.getUTCDate() - 1)
    startPeriodDate.setUTCHours(9, 0, 0)

    startPeriod = indonesiaStockMarketTime(startPeriodDate)
  } else if (returnType === 'weekly') {
    const startPeriodDate = new Date(endPeriod)

    const daysSinceMonday = (startPeriodDate.getUTCDay() + 6) % 7
    startPeriodDate.setUTCDate(startPeriodDate.getUTCDate() - daysSinceMonday)
    startPeriodDate.setUTCHours(9, 0, 0)

    startPeriod = indonesiaStockMarketTime(startPeriodDate)
  } else {
    const currentYear = endPeriod.getUTCFullYear()
    const currentMonth = endPeriod.getUTCMonth() + 1

    let startPeriodDate: Date

    if (endPeriod.getUTCDate() === 1) {
      if (currentMonth === 0) {
        startPeriodDate = new Date(Date.UTC(currentYear - 1, 10, 0))
      } else {
        startPeriodDate = new Date(Date.UTC(currentYear, currentMonth - 1, 0))
      }
    } else {
      startPeriodDate = new Date(Date.UTC(currentYear, currentMonth - 1, 0))
    }

    startPeriodDate.setUTCHours(9, 0, 0)

    startPeriod = indonesiaStockMarketTime(startPeriodDate)
  }

  return { endPeriod, startPeriod }
}
