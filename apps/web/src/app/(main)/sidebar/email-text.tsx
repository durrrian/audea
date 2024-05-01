import { useUser } from '@clerk/nextjs'
import { Skeleton } from '@repo/web-ui/components'

export function EmailText() {
  const { user, isLoaded } = useUser()

  return (
    <div className='flex flex-col gap-0 text-left w-full'>
      <p className='text-xs'>You are logged in as:</p>
      {(() => {
        if (!isLoaded || !user?.primaryEmailAddress) {
          return <Skeleton className='w-full h-[20px] rounded-full' />
        }

        return <p className='font-medium text-sm'>{user.primaryEmailAddress.emailAddress}</p>
      })()}
    </div>
  )
}
