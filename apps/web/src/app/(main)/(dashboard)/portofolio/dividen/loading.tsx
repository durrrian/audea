import { Separator, Skeleton } from '@repo/web-ui/components'

export default function Loading() {
  return (
    <div className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto select-none'>
      <div className='mb-14 grid gap-2'>
        <header className='grid grid-cols-2 items-center gap-4'>
          <h1>Daftar Transaksi Supercuan Saham</h1>

          {/* Search bar */}
          <div className='w-full h-fit flex items-center justify-end'>
            <Skeleton className='w-full max-w-[300px] rounded-full h-10' />
          </div>
        </header>

        <Separator />
      </div>

      <div className='grid gap-10'>
        {new Array(10).fill(0).map((_, i) => {
          // eslint-disable-next-line react/no-array-index-key -- no value
          return <Skeleton key={i} className='w-full h-14 rounded-full' />
        })}
      </div>
    </div>
  )
}
