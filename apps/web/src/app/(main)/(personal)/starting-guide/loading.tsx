import { Skeleton } from '@repo/web-ui/components'

export default function Loading() {
  return (
    <div className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto'>
      <Skeleton className='w-full h-96 rounded-xl' />
    </div>
  )
}
