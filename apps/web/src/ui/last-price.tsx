'use client'

import { Skeleton } from '@repo/web-ui/components'
import { XIcon } from 'lucide-react'
import { useFetchStockPrice } from '~/hooks/use-fetch-stock-price'

export function LastPrice({ emitenCode, lastPrice }: { emitenCode: string; lastPrice: number }) {
  const { data, isPending, isError } = useFetchStockPrice(
    { type: 'code', emitenCode },
    { openPrice: 0, currentPrice: lastPrice, date: '' },
  )

  if (isPending)
    return (
      <div className='flex items-center justify-center'>
        <Skeleton className='w-[40px] h-[20px] rounded-full' />
      </div>
    )

  if (isError) {
    return (
      <div className='text-red-700 flex items-center justify-center'>
        <XIcon className='mr-2 w-4 h-4' /> Error
      </div>
    )
  }

  return <div className='text-center flex items-center justify-center'>{data.currentPrice}</div>
}
