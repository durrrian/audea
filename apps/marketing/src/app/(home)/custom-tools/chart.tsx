'use client'

import { rupiah } from '@repo/helper'
import { motion } from 'framer-motion'
import { LineChart, Line, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Image from 'next/image'
import cn from '@repo/tailwind-config/cn'
import { useWindowSize } from '@repo/web-ui/hooks'
import Logo from '@repo/assets/logo/square_logo.svg'
import type { GetVehiclePriceOutput } from './script/scrape-multiple-times'

interface ChartProps {
  tipe: GetVehiclePriceOutput
  stockReturnData: {
    name: string
    IHSG: number
    'Supercuan Saham': number
  }[]
}

export function Chart({ tipe, stockReturnData }: ChartProps) {
  const { width } = useWindowSize()

  const isMobile = width && width < 768

  const nilaiJual = Number(tipe.nilaiJual.split('.').join(''))
  const cuan = nilaiJual * (stockReturnData[stockReturnData.length - 1]['Supercuan Saham'] / 100)

  const newData = stockReturnData.map((v) => ({
    name: v.name,
    value: nilaiJual + nilaiJual * (v['Supercuan Saham'] / 100),
  }))

  newData.unshift({ name: 'Start', value: nilaiJual })

  return (
    <motion.div className='w-full h-fit mt-10 flex flex-col gap-12' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className='w-full text-center flex items-center justify-center flex-col gap-2 md:text-4xl text-2xl font-bold'>
        <h6 className='opacity-50'>Kamu emang beneran butuh {tipe.tipeKendaraan}?!</h6>
        <h6>
          Kamu bisa cuan <span className='text-green-700'>{rupiah(cuan)}</span>
        </h6>
      </header>

      <section className='w-full flex items-center justify-between gap-4 flex-wrap'>
        <div className='space-y-1 md:w-1/3 w-full'>
          <p className='text-base opacity-80'>Kamu ngabisin duit</p>
          <p className='font-bold md:text-3xl text-xl'>{rupiah(nilaiJual)}</p>
        </div>

        <div className='space-y-1 md:w-1/3 w-full'>
          <p className='text-base opacity-80 text-right'>Value Supercuan Saham</p>
          <p className='font-bold md:text-3xl text-xl text-right'>{rupiah(nilaiJual + cuan)}</p>
        </div>
      </section>

      <ResponsiveContainer
        width='100%'
        height={500}
        className={cn('max-w-[1400px] overflow-x-hidden mx-auto select-none p-2')}
      >
        <LineChart width={500} height={300} data={newData}>
          <YAxis
            domain={[(dataMin: number) => Math.floor(dataMin - 1000), (dataMax: number) => Math.ceil(dataMax + 100000)]}
            // eslint-disable-next-line no-constant-binary-expression -- what?
            mirror={typeof isMobile === 'boolean' ?? false}
            tick={false}
            axisLine={false}
          />
          <Tooltip
            // eslint-disable-next-line react/no-unstable-nested-components -- its okay
            content={({ active, payload, label }) => {
              // eslint-disable-next-line @typescript-eslint/prefer-optional-chain -- what?
              if (active && payload && payload.length && payload[0].value) {
                return (
                  <div className='w-fit h-fit md:p-4 p-2 rounded-md border-primary border bg-white'>
                    <p className='font-semibold text-lg'>{label === 0 ? 'Modal awal' : `Bulan ke-${label}`}</p>

                    <div className='space-y-2 mt-4'>
                      <p className='text-center text-[#2FB0BD]'>
                        <span className='font-medium'>{label === 0 ? 'Modal awal' : 'Nilai Investasi'}</span>:{' '}
                        <span className='font-bold'>{rupiah(Number(payload[0].value))}</span>
                      </p>
                    </div>
                  </div>
                )
              }

              return null
            }}
          />
          <Legend
            // eslint-disable-next-line react/no-unstable-nested-components -- its okay
            content={() => (
              <ul className='w-full flex flex-col gap-2 items-center justify-center text-center max-w-[1100px] mx-auto mt-4'>
                <li className='flex items-center justify-center gap-2'>
                  <Image
                    src={Logo}
                    alt='Supercuan Logo'
                    width={14}
                    height={14}
                    draggable={false}
                    className='select-none'
                  />

                  <p>Investasi kamu di Supercuan Saham</p>
                </li>

                <li>
                  Investasi berdasarkan <em>capital</em> Nilai Jual Obyek Pajak (NJOP) {tipe.tipeKendaraan} tahun{' '}
                  {new Date().getFullYear()}, dengan menggunakan metode <em>lump sum</em>. Jika menggunakan DCA{' '}
                  <em>(dollar-cost averaging)</em>, return akan lebih sedikit.
                </li>
              </ul>
            )}
          />
          <Line type='linear' dataKey='value' stroke='#1F365F' strokeWidth={6} activeDot={{ r: 12 }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
