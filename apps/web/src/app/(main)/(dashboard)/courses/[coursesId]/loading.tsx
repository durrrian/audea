import { AspectRatio, Separator, Skeleton } from '@repo/web-ui/components'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Loading() {
  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1400px] mx-auto select-none flex flex-col gap-10'>
      <div className='w-full h-fit flex flex-col gap-2'>
        <header className='flex flex-row items-center justify-between w-full h-fit gap-4 flex-wrap'>
          <Link
            href='/courses'
            className='bg-supercuan-primary text-supercuan-secondary flex items-center w-fit h-fit px-4 py-2 rounded-lg justify-center gap-2'
          >
            <ArrowLeft /> Kembali ke Course
          </Link>

          <section className='flex flex-col gap-2 w-fit h-fit'>
            <Skeleton className='w-28 h-6' />

            <section className='flex flex-col gap-0'>
              <Skeleton className='w-20 h-6' />
              <Skeleton className='w-28 h-6' />
            </section>
          </section>
        </header>

        <Separator />
      </div>

      <div className='w-full'>
        <AspectRatio ratio={16 / 9}>
          <Skeleton className='w-full h-96 rounded-2xl' />
        </AspectRatio>
      </div>

      <footer className='flex items-center justify-center w-full gap-4'>
        <Skeleton className='w-36 h-10' />

        <Skeleton className='w-36 h-10' />
      </footer>
    </main>
  )
}
