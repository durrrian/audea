import { Skeleton } from '@repo/web-ui/components'

export default function Loading() {
  return (
    <div className='flex justify-center gap-x-12 w-screen max-w-screen-2xl px-2'>
      <div className='border-border relative hidden flex-1 overflow-hidden rounded-xl border xl:flex'>
        <div className='relative flex h-full w-full flex-col items-center justify-evenly'>
          <Skeleton className='w-full h-full rounded-xl' />
        </div>
      </div>

      <div className='border-border dark:bg-background relative z-10 flex min-h-[min(800px,80dvh)] w-full max-w-lg flex-col rounded-xl border bg-neutral-100 p-6'>
        <Skeleton className='w-full h-full rounded-xl' />
      </div>
    </div>
  )
}
