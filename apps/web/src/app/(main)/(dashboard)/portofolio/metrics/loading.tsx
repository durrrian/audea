import { Skeleton } from '@repo/web-ui/components'

export default function Loading() {
  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1700px] mx-auto select-none'>
      <section className='grid gap-4 w-full'>
        <section className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          {new Array(6).fill(0).map((_, i) => {
            // eslint-disable-next-line react/no-array-index-key -- no value
            return <Skeleton className='w-full h-36 rounded-2xl' key={i} />
          })}
        </section>
      </section>
    </main>
  )
}
