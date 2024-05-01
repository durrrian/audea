'use client'

import type { Emiten, StockTransaction } from '@repo/prisma/client'
import { makeWallOfDeath } from '@repo/api'
import { DataTable, Skeleton } from '@repo/web-ui/components'
import { useQuery } from '@tanstack/react-query'
import { columns } from './columns'

interface WallOfDeathProps {
  allTransactions: StockTransaction[]
  allEmiten: Emiten[]
}

export function WallOfDeath({ allTransactions, allEmiten }: WallOfDeathProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['wall-of-death'],
    queryFn: async () => {
      const response = await makeWallOfDeath(allTransactions, allEmiten)

      return response
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchInterval: 5 * 60 * 1000,
  })

  if (isPending) {
    return <Skeleton className='w-full h-96 rounded-xl' />
  }

  if (isError) {
    return (
      <div className='flex items-center justify-center w-full rounded-xl h-96'>❌ Error, please refresh the page</div>
    )
  }

  return <DataTable columns={columns} data={data} title='Saham dilepas' />
}
