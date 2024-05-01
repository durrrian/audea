'use client'

import { useUser } from '@clerk/nextjs'
import { Skeleton } from '@repo/web-ui/components'

export function UserInfo() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className='flex items-center gap-x-2 flex-wrap gap-y-0'>
        <p>Anda masuk dengan alamat email:</p>
        <Skeleton className='h-[19px] w-[165px] rounded-full' />
      </div>
    )
  }

  return <p>Anda masuk dengan alamat email: {user?.primaryEmailAddress?.emailAddress}</p>
}
