import { Separator, Skeleton } from '@repo/web-ui/components'

export default function Loading() {
  return (
    <div className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1400px] mx-auto select-none flex flex-col gap-10'>
      <div className='w-full h-fit space-y-8'>
        {new Array(3).fill(0).map((_, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key -- no string value
            <section className='w-full h-full relative' key={i}>
              <Separator className='w-full h-[40px] rounded-full' />
            </section>
          )
        })}
      </div>

      {/* <div className='w-full overflow-hidden leading-[0] rotate-180'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          className='relative block w-full h-[20px]'
        >
          <path
            d='M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z'
            className='fill-supercuan-primary'
          />
        </svg>
      </div> */}

      <div className='w-full h-fit space-y-10'>
        <div className='space-y-4'>
          <header className='w-full grid md:grid-cols-2 grid-cols-1 items-center gap-4'>
            <h1 className='md:text-xl text-base md:text-left text-center'>
              Pilih analisis saham yang mau kamu cari tau
            </h1>

            {/* Search bar */}
            <div className='w-full h-fit flex items-center justify-end'>
              <Skeleton className='w-full max-w-[300px] h-12' />
            </div>
          </header>

          <Separator />
        </div>

        <section className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
          {new Array(3).fill(0).map((_, i) => {
            // eslint-disable-next-line react/no-array-index-key -- no string value
            return <Skeleton className='rounded-2xl w-full h-32' key={i} />
          })}
        </section>
      </div>
    </div>
  )
}
