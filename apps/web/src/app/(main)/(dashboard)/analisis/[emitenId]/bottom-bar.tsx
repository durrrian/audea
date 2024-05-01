import { AlertCircle, Tv } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle, Skeleton } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { rupiah } from '@repo/helper'
import { useQuery } from '@tanstack/react-query'
import { useFetchStockPrice } from '~/hooks/use-fetch-stock-price'
import { getEmitenWithStockPrice } from './get-emiten-with-stock-price'

interface BottombarProps {
  emitenId: string
}

export function Bottombar({ emitenId }: BottombarProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: [`${emitenId}-bottombar`],
    queryFn: async () => getEmitenWithStockPrice(emitenId),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  })

  const {
    data: stockPrice,
    isPending: isPendingStockPrice,
    isError: isErrorStockPrice,
  } = useFetchStockPrice({ type: 'id', emitenId })

  if (isPending) return <Skeleton className='w-full max-w-[800px] rounded-xl h-10 mx-auto' />

  if (isError)
    return (
      <Alert variant='destructive' className={cn('text-left text-sm w-full max-w-[800px] mx-auto')}>
        <AlertCircle className='h-4 w-4 text-supercuan-error' />
        <AlertTitle>Whoops!</AlertTitle>
        <AlertDescription>There is an error fetching emiten data.</AlertDescription>
      </Alert>
    )

  const { emiten, lot } = data

  return (
    <footer className='w-full max-w-[800px] mx-auto p-4 mt-20 select-none pb-20'>
      <Alert
        className={cn(
          'bg-supercuan-primary bg-opacity-10 backdrop-filter backdrop-blur-lg border border-supercuan-primary',
        )}
      >
        <Tv className='h-4 w-4' />
        <AlertTitle>Tahukah kamu!</AlertTitle>
        <AlertDescription>{emiten.description}</AlertDescription>

        <section className='flex items-center justify-start gap-4 flex-wrap text-sm mt-10'>
          {(() => {
            if (lot > 0) {
              return <p className='bg-green-700 text-white px-2 py-1 rounded-md w-fit h-fit'>{lot} lot</p>
            }

            return <p className='bg-red-700 text-white px-2 py-1 rounded-md w-fit h-fit'>Tidak ada di portofolio</p>
          })()}

          {(() => {
            if (isPendingStockPrice) {
              return <Skeleton className='w-[130px] h-[28px] rounded-full' />
            }

            if (isErrorStockPrice) {
              return <p className='bg-red-700 text-white px-2 py-1 rounded-md w-fit h-fit'>Error ambil harga</p>
            }

            return (
              <p className='bg-supercuan-primary text-supercuan-secondary px-2 py-1 rounded-md w-fit h-fit'>
                Last price: {rupiah(stockPrice.currentPrice)}
              </p>
            )
          })()}
        </section>
      </Alert>
    </footer>
  )
}
