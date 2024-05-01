'use client'

import cn from '@repo/tailwind-config/cn'
import { useQuery } from '@tanstack/react-query'
import { Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { BackgroundGradient } from '../animation'
import { X } from 'lucide-react'
import { useMediaQuery } from '../hooks'
import type { CummulativeStockData } from '@repo/api'
import { getCummulativeStockData } from '@repo/api'
import { LoadingSpinner } from '../components'

type Props = {
  className?: string
  initialData?: CummulativeStockData
}

export function HeroChart({ className, initialData }: Props) {
  const matches = useMediaQuery('(min-width: 640px)')

  const { data, isPending, isError, isRefetching } = useQuery({
    queryKey: ['cummulative-stock-data'],
    queryFn: async () => getCummulativeStockData(),
    staleTime: 1000 * 60 * 60 * 24,
    initialData: initialData,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <div
      className={cn(
        'w-full max-w-[1000px] h-fit min-h-[500px] mx-auto bg-supercuan-whitePrimary rounded-3xl sm:p-4 p-2',
        className,
      )}
    >
      {(() => {
        if (isPending || isRefetching) {
          return (
            <div className='w-full min-h-[400px] flex items-center justify-center text-supercuan-primary'>
              <LoadingSpinner type='lucide' className='w-10 h-10' />
            </div>
          )
        }

        if (isError) {
          return (
            <div className='w-full min-h-[400px] flex items-center justify-center'>
              <div className='flex flex-col items-center justify-center text-center text-red-700'>
                <X className={cn('w-10 h-10')} />
                <p className='text-sm'>Gagal memuat data</p>
              </div>
            </div>
          )
        }

        return (
          <ResponsiveContainer width='100%' height={500} className={cn('overflow-x-hidden mx-auto select-none p-2')}>
            <LineChart width={500} height={300} data={matches ? data : data.slice(5)}>
              <ReferenceLine y={0} stroke='black' strokeWidth={1} strokeOpacity={1} strokeDasharray='3 3' />

              <XAxis dataKey='name' hide={true} />

              <YAxis
                domain={[(dataMin: number) => Math.floor(dataMin - 1), (dataMax: number) => Math.ceil(dataMax + 0.5)]}
                ticks={[0, 10, 20]}
                hide={true}
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <BackgroundGradient className='rounded-[22px] max-w-sm p-4 bg-supercuan-secondary'>
                        <p className='font-semibold text-base text-black'>{label}</p>

                        <div className='space-y-2 mt-4'>
                          <p className='text-center text-[#1F365F] text-sm'>
                            <span className='font-medium'>Supercuan Saham</span>:{' '}
                            <span className='font-bold'>{payload[0].value}%</span>
                          </p>

                          <p className='text-center text-black text-xs'>VS</p>

                          <p className='text-center text-[#DC2626] text-sm'>
                            <span className='font-medium'>IHSG</span>:{' '}
                            <span className='font-bold'>{payload[1].value}%</span>
                          </p>
                        </div>
                      </BackgroundGradient>
                    )
                  }

                  return null
                }}
              />
              <Legend />
              <Line type='linear' dataKey='Supercuan Saham' stroke='#1F365F' strokeWidth={5} activeDot={{ r: 8 }} />
              <Line type='linear' dataKey='IHSG' stroke='#DC2626' strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )
      })()}

      <section className='text-center max-w-[1100px] mx-auto space-y-2 px-2 text-supercuan-primary'>
        <p>Grafik return portofolio Supercuan Saham vs. Index Harga Saham Gabungan.</p>

        <p className='text-sm opacity-50'>Pssst, this is using real live data!</p>

        {!matches && (
          <p className='text-xs opacity-50'>
            Data diambil sebagian <em>for better user experience!</em>
          </p>
        )}
      </section>
    </div>
  )
}
