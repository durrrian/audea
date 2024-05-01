/* eslint-disable react/no-unstable-nested-components -- no other way */

import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TextDisplayProps } from './text-display'
import TextDisplay from './text-display'

interface Data {
  name: string
  IHSG?: number
  'Supercuan Saham': number
  LQ45?: number
}

export interface BarLineChartProps extends Omit<TextDisplayProps, 'withSelect' | 'children'> {
  data: Data[]
  indeks: 'IHSG' | 'LQ45'
  type: 'BAR' | 'LINE'
}

export default function BarLineChart({
  title,
  subtitle,
  selectOnValueChange,
  selectDefaultValue,
  selectItems,
  data,
  indeks,
  type,
}: BarLineChartProps) {
  return (
    <TextDisplay
      title={title}
      subtitle={subtitle}
      selectOnValueChange={selectOnValueChange}
      selectDefaultValue={selectDefaultValue}
      selectItems={selectItems}
      withSelect
    >
      <ResponsiveContainer width='100%' height={500}>
        {(() => {
          if (type === 'BAR') {
            return (
              <BarChart width={500} height={500} data={data}>
                <YAxis
                  domain={[
                    (dataMin: number) => Math.floor(dataMin - 0.5),
                    (dataMax: number) => Math.ceil(dataMax + 0.5),
                  ]}
                  mirror
                  ticks={[-4, -2, 0, 2, 4, 6]}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length > 1) {
                      return <CustomTooltip label={label} payload={payload} indeks={indeks} />
                    }

                    return null
                  }}
                />
                <ReferenceLine y={0} stroke='black' strokeWidth={1} strokeOpacity={1} />
                <XAxis dataKey='name' />
                <Bar dataKey='Supercuan Saham' fill='#2FB0BD' />
                <Bar dataKey={indeks} fill='#DC2626' />
                <Legend />
              </BarChart>
            )
          }

          return (
            <LineChart width={500} height={500} data={data}>
              <ReferenceLine y={0} stroke='black' strokeWidth={1} strokeOpacity={1} />
              <XAxis dataKey='name' />
              <YAxis
                domain={[(dataMin: number) => Math.floor(dataMin - 1), (dataMax: number) => Math.ceil(dataMax + 0.5)]}
                ticks={[0, 10, 20]}
                mirror
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length > 1) {
                    return <CustomTooltip label={label} payload={payload} indeks={indeks} />
                  }

                  return null
                }}
              />
              <Legend />
              <Line type='linear' dataKey='Supercuan Saham' stroke='#2FB0BD' strokeWidth={4} activeDot={{ r: 8 }} />
              <Line type='linear' dataKey={indeks} stroke='#DC2626' strokeWidth={4} />
            </LineChart>
          )
        })()}
      </ResponsiveContainer>
    </TextDisplay>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any -- need any on some of the places */
function CustomTooltip({ label, payload, indeks }: { label: any; payload: any[]; indeks: any }) {
  return (
    <div className='w-fit h-fit md:p-4 p-2 rounded-md border-primary border bg-white'>
      <p className='font-semibold text-lg'>{label}</p>

      <div className='space-y-2 mt-4'>
        <p className='text-center text-[#2FB0BD]'>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- its okay */}
          <span className='font-medium'>Supercuan Saham</span>: <span className='font-bold'>{payload[0].value}%</span>
        </p>

        <p className='text-center'>VS</p>

        <p className='text-center text-[#DC2626]'>
          <span className='font-medium'>{indeks}</span>:{' '}
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- its okay */}
          {payload[1].payload.IHSG ? <span className='font-bold'>{payload[1].payload.IHSG}%</span> : null}
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- its okay */}
          {payload[1].payload.LQ45 ? <span className='font-bold'>{payload[1].payload.LQ45}%</span> : null}
        </p>
      </div>
    </div>
  )
}
