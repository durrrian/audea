/* eslint-disable @typescript-eslint/no-unsafe-member-access -- its okay */
/* eslint-disable @typescript-eslint/restrict-plus-operands  -- its okay*/
/* eslint-disable react/no-unstable-nested-components -- its okay */

'use client'

import { Cell, Legend, Sector } from 'recharts'
import type { PortofolioColumns } from '@repo/api'
import { useMediaQuery } from '@repo/web-ui/hooks'
import PieChartNew from '../component/pie-chart'

interface StockWeightProps {
  portofolio: PortofolioColumns[]
}

export function StockWeight({ portofolio }: StockWeightProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const RADIAN = Math.PI / 180

  const COLORS = generateRgbaArray(portofolio.length)

  const data = portofolio
    .map((v) => {
      return {
        weight: v['Weight %'],
        name: v.Emiten,
      }
    })
    .sort((a, b) => b.weight - a.weight)

  return (
    <PieChartNew
      title='Pie Chart Weight'
      subtitle='Pie chart berdasarkan weight'
      data={data}
      pieChartChildren={
        <>
          {!isMobile && (
            <Legend
              payload={data.map((item, index) => ({
                id: item.name,
                type: 'circle',
                value: item.name,
                color: COLORS[index],
                legendIcon: (
                  <svg width='30' height='30' xmlns='http://www.w3.org/2000/svg'>
                    <image
                      href={`https://assets.stockbit.com/logos/companies/${item.name}.png`}
                      x='0'
                      y='0'
                      width='30'
                      height='30'
                    />
                  </svg>
                ),
              }))}
            />
          )}
        </>
      }
      pieChildren={
        <>
          {data.map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key -- no value
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
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

        const innerRadiusOuter = outerRadius + 6
        const outerRadiusOuter = outerRadius + 10

        const ex = mx + (cos >= 0 ? 1 : -1) * 22
        const ey = my

        const textAnchor = cos >= 0 ? 'start' : 'end'

        return (
          <g>
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
              innerRadius={innerRadiusOuter}
              outerRadius={outerRadiusOuter}
              fill={fill}
            />
            {isMobile ? (
              <>
                <image
                  href={`https://assets.stockbit.com/logos/companies/${payload.name}.png`}
                  width='50'
                  height='50'
                  x={cx - 25}
                  y={cy - 25 - 20}
                />
                <text x={cx} y={cy + 20} dy={8} textAnchor='middle' fill='#333' fontSize={16}>
                  {payload.name}
                </text>
                <text x={cx} y={cy + 40} dy={8} textAnchor='middle' fill='#333' fontSize={16}>
                  {(percent * 100).toFixed(2)}%
                </text>
              </>
            ) : (
              <>
                <image
                  href={`https://assets.stockbit.com/logos/companies/${payload.name}.png`}
                  width='50'
                  height='50'
                  x={cx - 25}
                  y={cy - 25}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill='#333' fontSize={16}>
                  {payload.name}
                </text>
                <text
                  x={ex + (cos >= 0 ? 1 : -1) * 12}
                  y={ey}
                  dy={18}
                  textAnchor={textAnchor}
                  fill='#999'
                  fontSize={16}
                >
                  Weight {(percent * 100).toFixed(2)}%
                </text>
              </>
            )}
          </g>
        )
      }}
    />
  )
}

function generateRgbaArray(length: number) {
  const startColor = [31, 54, 95] // RGB values of #1F365F
  const middleColor = [255, 0, 0] // RGB values of #9932CC (purple)
  const endColor = [34, 139, 34] // RGB values of #228B22 (green)
  const rgbaArray = []

  for (let i = 0; i < length; i++) {
    const t = i / (length - 1)
    const r = Math.round((1 - t) * startColor[0] + t * (1 - t) * middleColor[0] + t * endColor[0])
    const g = Math.round((1 - t) * startColor[1] + t * (1 - t) * middleColor[1] + t * endColor[1])
    const b = Math.round((1 - t) * startColor[2] + t * (1 - t) * middleColor[2] + t * endColor[2])

    rgbaArray.push(`rgba(${r}, ${g}, ${b}, 1)`)
  }

  return rgbaArray
}
