/* eslint-disable @typescript-eslint/no-unsafe-member-access -- its okay */
/* eslint-disable @typescript-eslint/no-unsafe-call -- its okay */
/* eslint-disable @typescript-eslint/restrict-plus-operands -- its okay */
/* eslint-disable react/no-unstable-nested-components -- its okay */
/* eslint-disable no-else-return -- its okay */
/* eslint-disable no-lonely-if -- its okay */
'use client'

import { Cell, Legend, Sector } from 'recharts'
import type { Emiten, Industry } from '@repo/prisma/client'
import { industryWeight, type PortofolioColumns } from '@repo/api'
import { useMediaQuery } from '@repo/web-ui/hooks'
import PieChartNew from '../component/pie-chart'

interface IndustryWeightProps {
  portofolio: PortofolioColumns[]
  allIndustry: Industry[]
  allEmiten: Emiten[]
}

export function IndustryWeight({ portofolio, allIndustry, allEmiten }: IndustryWeightProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const RADIAN = Math.PI / 180

  const data = industryWeight(portofolio, allIndustry, allEmiten)

  return (
    <PieChartNew
      title='Pie Chart Industry'
      subtitle='Pie chart berdasarkan industry'
      data={data}
      pieChartChildren={
        <>
          {!isMobile && (
            <Legend
              payload={data.map((item) => ({
                id: item.name,
                type: 'square',
                value: item.name,
                color: `#${allIndustry.find((v) => v.name === item.name)?.hexCode}`,
              }))}
            />
          )}
        </>
      }
      pieChildren={
        <>
          {data.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key -- no value
            <Cell key={`cell-${index}`} fill={`#${allIndustry.find((v) => v.name === entry.name)?.hexCode}`} />
          ))}
        </>
      }
      pieActiveShape={({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- its okay
      }: any) => {
        const sin = Math.sin(-RADIAN * midAngle)
        const cos = Math.cos(-RADIAN * midAngle)
        const sx = cx + (outerRadius + 10) * cos
        const sy = cy + (outerRadius + 10) * sin
        const mx = cx + (outerRadius + 30) * cos
        const my = cy + (outerRadius + 30) * sin
        const ex = mx + (cos >= 0 ? 1 : -1) * 22
        const ey = my
        const textAnchor = cos >= 0 ? 'start' : 'end'

        const payloadArr: string[] = payload.name.split(' ')

        const payloadLength: number = payloadArr.length

        return (
          <g>
            {(() => {
              if (isMobile) {
                if (payloadLength <= 2) {
                  return (
                    <>
                      <text x={cx} y={cy - 10} dy={8} textAnchor='middle' fill='#333'>
                        {payloadArr[0]} {payloadArr[1]}
                      </text>
                      <text x={cx} y={cy + 10} dy={8} textAnchor='middle' fill='#333'>
                        {(percent * 100).toFixed(2)}%
                      </text>
                    </>
                  )
                } else if (payloadLength <= 4) {
                  return (
                    <>
                      <text x={cx} y={cy - 20} dy={8} textAnchor='middle' fill='#333'>
                        {payloadArr[0]} {payloadArr[1]}
                      </text>
                      <text x={cx} y={cy} dy={8} textAnchor='middle' fill='#333'>
                        {payloadArr[2]} {payloadArr[3]}
                      </text>
                      <text x={cx} y={cy + 20} dy={8} textAnchor='middle' fill='#333'>
                        {(percent * 100).toFixed(2)}%
                      </text>
                    </>
                  )
                } else {
                  return (
                    <>
                      <text x={cx} y={cy - 30} dy={8} textAnchor='middle' fill='#333'>
                        {payloadArr[0]} {payloadArr[1]}
                      </text>
                      <text x={cx} y={cy - 10} dy={8} textAnchor='middle' fill='#333'>
                        {payloadArr[2]} {payloadArr[3]}
                      </text>
                      <text x={cx} y={cy + 10} dy={8} textAnchor='middle' fill='#333'>
                        {payloadArr[4]} {payloadArr[5]}
                      </text>
                      <text x={cx} y={cy + 30} dy={8} textAnchor='middle' fill='#333'>
                        {(percent * 100).toFixed(2)}%
                      </text>
                    </>
                  )
                }
              } else {
                if (payloadLength < 3) {
                  return (
                    <text x={cx} y={cy} dy={8} textAnchor='middle' fill='#333'>
                      {payloadArr[0]} {payloadArr[1]}
                    </text>
                  )
                } else {
                  return (
                    <>
                      <text x={cx} y={cy - 10} dy={8} textAnchor='middle' fill='#333'>
                        {payloadArr[0]} {payloadArr[1]}
                      </text>
                      <text x={cx} y={cy + 10} dy={8} textAnchor='middle' fill='#333'>
                        {payloadArr[2]} {payloadArr[3]}
                      </text>
                      <text x={cx} y={cy + 30} dy={8} textAnchor='middle' fill='#333'>
                        {payloadArr[4]} {payloadArr[5]}
                      </text>
                    </>
                  )
                }
              }
            })()}
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
            />
            <Sector
              cx={cx}
              cy={cy}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={outerRadius + 6}
              outerRadius={outerRadius + 10}
              fill={fill}
            />
            {!isMobile && (
              <>
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 5} textAnchor={textAnchor} fill='#333'>
                  {(percent * 100).toFixed(2)}%
                </text>
              </>
            )}
          </g>
        )
      }}
    />
  )
}
