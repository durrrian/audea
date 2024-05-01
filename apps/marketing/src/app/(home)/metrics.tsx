'use client'

import { useQuery } from '@tanstack/react-query'
import LineImage from '@repo/assets/marketing/metrics/vector.svg'
import Image from 'next/image'
import type { CummulativeStockData } from '@repo/api'
import { getMetrics } from '~/lib/get-metrics'

interface MetricsProps {
  metricsInitial: {
    activeMember: number
    returnVsIhsg: number
    platinumMember: number
  }

  cummulativeStockData: CummulativeStockData
}

export function Metrics({ metricsInitial, cummulativeStockData }: MetricsProps) {
  const { data } = useQuery({
    queryKey: ['landing-page-metrics'],
    queryFn: async () => getMetrics(cummulativeStockData),
    initialData: metricsInitial,
  })

  const arr = [
    { val: data.activeMember, text: 'Member Aktif' },
    { val: data.returnVsIhsg, text: 'Return diatas IHSG' },
    { val: data.platinumMember, text: 'Platinum Member' },
  ]

  return (
    <section className='relative max-w-full selection:bg-supercuan-secondary selection:text-supercuan-primary'>
      <div className='min-w-full absolute inset-0 z-[-1]'>
        <Image src={LineImage} alt='' draggable={false} quality={100} width={5000} />
      </div>

      <div className='w-full h-fit flex items-center justify-center'>
        <div className='px-2'>
          <div className='flex flex-col items-center justify-center text-center gap-12 bg-supercuan-primary text-supercuan-secondary w-fit h-fit md:px-14 px-8 md:py-8 py-4 rounded-3xl'>
            <section className='flex items-center justify-center md:gap-14 gap-8 w-fit h-fit'>
              {arr.map(({ val, text }) => {
                return (
                  <section
                    key={text}
                    className='w-fit h-fit flex flex-col items-center justify-center gap-2 text-center font-medium'
                  >
                    <p className='md:text-6xl text-4xl'>
                      +{val}
                      {val === data.returnVsIhsg ? '%' : ''}
                    </p>
                    <p className='md:text-2xl text-xl'>{text}</p>
                  </section>
                )
              })}
            </section>
            <section>
              <p className='text-2xl font-medium'>3 Saham Multibagger Since Inception</p>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
