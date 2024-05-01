'use client'

import type { ReturnVsIndex } from '@repo/prisma/client'
import { useState } from 'react'
import { useMediaQuery } from '@repo/web-ui/hooks'
import type { BarLineChartProps } from '../component/bar-line-chart'
import BarLineChart from '../component/bar-line-chart'

interface HeadToHeadVsIhsgProps {
  data: ReturnVsIndex[]
}

export function HeadToHeadVsIhsg({ data }: HeadToHeadVsIhsgProps) {
  const [indeks, setIndeks] = useState<BarLineChartProps['indeks']>('IHSG')

  const isMobile = useMediaQuery('(max-width: 768px)')

  const [showData, setShowData] = useState<BarLineChartProps['data']>(
    data
      .map((v) => {
        return {
          name: v.period,
          IHSG: v.ihsg,
          'Supercuan Saham': v.supercuan,
        }
      })
      .slice(isMobile ? data.length - 6 : 0, data.length),
  )

  return (
    <BarLineChart
      data={showData}
      indeks={indeks}
      type='BAR'
      title='Supercuan Saham VS'
      subtitle={` Head to head. Periode ${showData[0].name} - ${showData[showData.length - 1].name}`}
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
            data
              .map((y) => {
                return {
                  name: y.period,
                  IHSG: y.ihsg,
                  'Supercuan Saham': y.supercuan,
                }
              })
              .slice(isMobile ? data.length - 6 : 0, data.length),
          )
        }

        if (val === 'LQ45') {
          setShowData(
            data
              .map((y) => {
                return {
                  name: y.period,
                  LQ45: y.lq45,
                  'Supercuan Saham': y.supercuan,
                }
              })
              .slice(isMobile ? data.length - 6 : 0, data.length),
          )
        }
      }}
    />
  )
}
