'use client'

import type { Emiten, StockTransaction } from '@repo/prisma/client'
import { calculateGainerLoserToday } from '@repo/api'
import { formatDate } from '@repo/helper'
import { useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from '@repo/web-ui/components'
import { X } from 'lucide-react'
import TextDisplay from '../component/text-display'
import { TopGainerLoser } from '../component/top-gainer-loser'

interface Top3GainerTodayProps {
  allTransactions: StockTransaction[]
  allEmiten: Emiten[]
}

export function Top3GainerToday({ allTransactions, allEmiten }: Top3GainerTodayProps) {
  const { data, isError, isPending } = useQuery({
    queryKey: ['top3losergainertoday'],
    queryFn: async () => {
      const calc = await calculateGainerLoserToday(allTransactions, allEmiten)

      return calc
    },
  })

  const title = 'Today top 3 Gainer'

  if (isPending) {
    return (
      <TextDisplay title={title} subtitle=''>
        <LoadingSpinner className='h-10 w-10' type='lucide' />
      </TextDisplay>
    )
  }

  if (isError) {
    return (
      <TextDisplay title={title} subtitle=''>
        <p className='text-red-700'>
          <X className='mr-2 h-4 w-4' />
          Error ambil data
        </p>
      </TextDisplay>
    )
  }

  const subtitle = formatDate(new Date(data.date), 'long')

  return (
    <TopGainerLoser
      title={title}
      subtitle={subtitle}
      tableHeader={['Emiten', 'Ptsl (+/-)', 'Ptsl (+/-) %', 'Last Price']}
      data={data.items.sort((a, b) => b['Ptsl (+/-) %'] - a['Ptsl (+/-) %']).slice(0, 3)}
    />
  )
}
