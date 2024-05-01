import { Skeleton } from '@repo/web-ui/components'

export default function Loading() {
  return (
    <div className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto select-none'>
      <div className='w-full h-fit p-2 space-y-8'>
        {new Array(3).fill(0).map((_, i) => {
          // eslint-disable-next-line react/no-array-index-key -- no value
          return <Skeleton key={i} className='w-full h-20 rounded-xl' />
        })}
      </div>
    </div>
  )
}
