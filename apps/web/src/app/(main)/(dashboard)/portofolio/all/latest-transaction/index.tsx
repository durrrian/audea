'use client'

import { Separator, Skeleton } from '@repo/web-ui/components'
import { useQuery } from '@tanstack/react-query'
import { EmitenLogo } from '~/ui/emiten-logo'
import { getLatestTransaction } from './get-latest-transaction'

export function LatestTransaction() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['latest-transaction'],
    queryFn: async () => {
      const response = await getLatestTransaction()

      return response
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  })

  if (isPending) {
    return (
      <section className='grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4'>
        <Skeleton className='w-full h-20 rounded-xl' />
        <Skeleton className='w-full h-20 rounded-xl' />
      </section>
    )
  }

  if (isError) {
    return (
      <section className='grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4'>
        <div className='flex items-center justify-center w-full h-20 rounded-xl'>
          ❌ Error ambil data please refresh the page
        </div>
        <div className='flex items-center justify-center w-full h-20 rounded-xl'>
          ❌ Error ambil data please refresh the page
        </div>
      </section>
    )
  }

  return (
    <section className='grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4'>
      {data.map((v) => {
        return (
          <section
            key={v.name}
            className='p-4 rounded-xl bg-supercuan-primary text-supercuan-secondary border border-supercuan-greyPrimary shadow-sm grid gap-4'
          >
            <section className='grid gap-1'>
              <p className='text-lg font-medium'>{v.name}</p>

              <Separator />
            </section>

            <section className='grid gap-2'>
              {v.items.map((y) => {
                return (
                  <section key={y.emitenId} className='w-full flex items-center justify-between gap-8'>
                    <section className='flex items-center justify-center gap-2'>
                      <EmitenLogo kodeEmiten={y.emiten.kodeEmiten} size={20} />
                      <p>{y.emiten.kodeEmiten}</p>
                    </section>

                    <section className='flex items-center justify-center gap-8'>
                      <p>
                        {y.lot} <span className='text-sm'>lot</span>
                      </p>
                      <p>{y.price}</p>
                    </section>
                  </section>
                )
              })}
            </section>
          </section>
        )
      })}
    </section>
  )
}
