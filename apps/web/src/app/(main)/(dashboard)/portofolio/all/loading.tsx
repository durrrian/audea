import { Skeleton } from '@repo/web-ui/components'

export default function Loading() {
  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1400px] mx-auto select-none'>
      <section className='space-y-14'>
        <Skeleton className='w-full h-96 rounded-xl' />

        <Skeleton className='w-full h-32 rounded-xl' />

        <section className='grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4'>
          <Skeleton className='w-full h-20 rounded-xl' />
          <Skeleton className='w-full h-20 rounded-xl' />
        </section>
      </section>
    </main>
  )
}
