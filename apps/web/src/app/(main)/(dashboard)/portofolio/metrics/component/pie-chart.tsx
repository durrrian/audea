import { Pie, PieChart as PieChartRecharts, ResponsiveContainer } from 'recharts'
import { useState } from 'react'
import type { ActiveShape } from 'recharts/types/util/types'
import type { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { useMediaQuery } from '@repo/web-ui/hooks'
import TextDisplay from './text-display'
import type { TextDisplayProps } from './text-display'

interface Data {
  name: string
  weight: number
}

export interface PieChartProps extends Omit<TextDisplayProps, 'withSelect' | 'children'> {
  data: Data[]
  pieChildren: React.ReactNode
  pieActiveShape: ActiveShape<PieSectorDataItem>
  pieChartChildren: React.ReactNode
}

export default function PieChart({
  title,
  subtitle,
  data,
  pieChildren,
  pieActiveShape,
  pieChartChildren,
}: PieChartProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <TextDisplay title={title} subtitle={subtitle}>
      <ResponsiveContainer width='100%' height={isMobile ? 400 : 600}>
        <PieChartRecharts width={isMobile ? 400 : 600} height={isMobile ? 400 : 600}>
          <Pie
            activeIndex={activeIndex}
            activeShape={pieActiveShape}
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={110}
            outerRadius={150}
            fill='#8884d8'
            dataKey='weight'
            onMouseEnter={(_, index) => {
              setActiveIndex(index)
            }}
          >
            {pieChildren}
          </Pie>

          {pieChartChildren}
        </PieChartRecharts>
      </ResponsiveContainer>
    </TextDisplay>
  )
}
