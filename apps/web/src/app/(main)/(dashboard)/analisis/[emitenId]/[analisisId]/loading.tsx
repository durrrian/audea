import { Separator, Skeleton } from '@repo/web-ui/components'
import { BookOpen } from 'lucide-react'

export default function Loading() {
  return (
    <div className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto gap-10 flex flex-col items-start justify-center text-justify'>
      <div className='space-y-2 w-full h-fit'>
        <div className='space-y-6'>
          <div className='space-y-2 text-left'>
            <Skeleton className='w-36 h-6 rounded-full' />
            <Skeleton className='w-24 h-4' />
          </div>

          <div className='flex items-start justify-between gap-4 flex-wrap'>
            <div className='space-y-1'>
              <Skeleton className='w-20 h-6 rounded-full' />
            </div>

            <div className='flex items-center justify-center w-fit h-fit gap-1'>
              <BookOpen className='w-4 h-4' /> <Skeleton className='w-10 h-4 rounded-full' />
            </div>
          </div>
        </div>

        <Separator />
      </div>

      <Skeleton className='w-full h-96 rounded-2xl' />
    </div>
  )
}
