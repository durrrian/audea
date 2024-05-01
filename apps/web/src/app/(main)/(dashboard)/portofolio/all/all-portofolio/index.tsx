'use client'

import type { Emiten, StockTransaction } from '@repo/prisma/client'
import { DataTable, Skeleton } from '@repo/web-ui/components'
import { makePortofolio } from '@repo/api'
import { useQuery } from '@tanstack/react-query'
import { columns } from './columns'

interface AllPortofolioProps {
  allTransactions: StockTransaction[]
  allEmiten: Emiten[]
}

export function AllPortofolio({ allTransactions, allEmiten }: AllPortofolioProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['all-portofolio'],
    queryFn: async () => {
      const { result: portfolio } = await makePortofolio(allTransactions, allEmiten)

      return portfolio.sort((a, b) => a.Emiten.localeCompare(b.Emiten))
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

  return <DataTable columns={columns} data={data} title='Portofolio' />
}
