'use client'

import type { GetStockPriceProps } from '@repo/api'
import { getStockPrice } from '@repo/api'
import { useQuery } from '@tanstack/react-query'

export function useFetchStockPrice(
  props: GetStockPriceProps,
  initialData?: { currentPrice: number; openPrice: number; date: string },
) {
  return useQuery({
    queryKey: [`${props.type === 'code' ? props.emitenCode : props.emitenId}-stock-price`],
    queryFn: async () => getStockPrice(props),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
    initialData,
  })
}
