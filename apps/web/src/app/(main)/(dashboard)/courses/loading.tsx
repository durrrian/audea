import { Skeleton } from '@repo/web-ui/components'

export default function Loading() {
  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1400px] mx-auto select-none grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
      {new Array(6).fill(0).map((_, i) => {
        // eslint-disable-next-line react/no-array-index-key -- no value
        return <Skeleton className='rounded-2xl w-full h-24' key={i} />
      })}
    </main>
  )
}
