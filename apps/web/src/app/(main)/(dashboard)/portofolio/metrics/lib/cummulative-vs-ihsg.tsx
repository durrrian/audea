'use client'

import type { ReturnVsIndex } from '@repo/prisma/client'
import { useState } from 'react'
import { useMediaQuery } from '@repo/web-ui/hooks'
import { cummulativeStockReturnData } from '@repo/api'
import type { BarLineChartProps } from '../component/bar-line-chart'
import BarLineChart from '../component/bar-line-chart'

interface CummulativeVsIhsgProps {
  data: ReturnVsIndex[]
}

export function CummulativeVsIhsg({ data }: CummulativeVsIhsgProps) {
  const cummuLativeStockData = cummulativeStockReturnData(data)

  const [indeks, setIndeks] = useState<BarLineChartProps['indeks']>('IHSG')

  const isMobile = useMediaQuery('(max-width: 768px)')

  const [showData, setShowData] = useState<BarLineChartProps['data']>(
    cummuLativeStockData
      .map((v) => {
        return {
          name: v.name,
          IHSG: v.IHSG,
          'Supercuan Saham': v['Supercuan Saham'],
        }
      })
      .slice(isMobile ? data.length - 6 : 0, data.length),
  )

  return (
    <BarLineChart
      data={showData}
      indeks={indeks}
      type='LINE'
      title='Supercuan Saham VS'
      subtitle={`Cummulative. Periode ${showData[0].name} - ${showData[showData.length - 1].name}`}
      selectDefaultValue={indeks}
      selectItems={[
        { value: 'IHSG', name: 'IHSG' },
        { value: 'LQ45', name: 'LQ45' },
      ]}
      selectOnValueChange={(v) => {
        const val = v as BarLineChartProps['indeks']

        setIndeks(val)

        if (val === 'IHSG') {
          setShowData(
            cummuLativeStockData
              .map((y) => {
                return {
                  name: y.name,
                  IHSG: y.IHSG,
                  'Supercuan Saham': y['Supercuan Saham'],
                }
              })
              .slice(isMobile ? data.length - 6 : 0, data.length),
          )
        }

        if (val === 'LQ45') {
          setShowData(
            cummuLativeStockData
              .map((y) => {
                return {
                  name: y.name,
                  LQ45: y.LQ45,
                  'Supercuan Saham': y['Supercuan Saham'],
                }
              })
              .slice(isMobile ? data.length - 6 : 0, data.length),
          )
        }
      }}
    />
  )
}
