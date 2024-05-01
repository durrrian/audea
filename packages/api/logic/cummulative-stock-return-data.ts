import type { ReturnVsIndex } from '@repo/prisma/client'

export interface CummulativeStockReturnData {
  name: string
  IHSG: number
  'Supercuan Saham': number
  LQ45: number
}

export const cummulativeStockReturnData = (data: ReturnVsIndex[]): CummulativeStockReturnData[] => {
  let cumulativeSupercuan = 0
  let cumulativeIhsg = 0
  let cumulativeLq45 = 0

  const cummuLativeStockData = data.map((v) => {
    cumulativeSupercuan += v.supercuan
    cumulativeIhsg += v.ihsg
    cumulativeLq45 += v.lq45

    // Format cumulative values to two decimal places using toFixed()
    const formattedCumulativeSupercuan = parseFloat(cumulativeSupercuan.toFixed(2))
    const formattedCumulativeIhsg = parseFloat(cumulativeIhsg.toFixed(2))
    const formattedCumulativeLq45 = parseFloat(cumulativeLq45.toFixed(2))

    return {
      name: v.period,
      IHSG: formattedCumulativeIhsg,
      'Supercuan Saham': formattedCumulativeSupercuan,
      LQ45: formattedCumulativeLq45,
    }
  })

  return cummuLativeStockData
}
