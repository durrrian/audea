'use client'

import { useClerk } from '@clerk/nextjs'
import type { User } from '@repo/prisma/client'
import cn from '@repo/tailwind-config/cn'
import { Button, Separator, Badge, CardHeader, CardTitle, CardDescription } from '@repo/web-ui/components'
import { useQuery } from '@tanstack/react-query'
import { Laptop, Smartphone } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ActiveDevicesProps {
  className?: string
  user: User
}

export function ActiveDevices({ className, user }: ActiveDevicesProps) {
  const router = useRouter()

  const { signOut, user: clerkUser, loaded, session } = useClerk()

  const { data, isError, isPending } = useQuery({
    queryKey: [`active-devices-${user.id}`],
    queryFn: async () => {
      const sessions = await clerkUser?.getSessions()
      return sessions
    },
  })

  if (!loaded) return null

  if (!clerkUser || !session) {
    router.push('/sign-in')
    return
  }

  if (isError) throw new Error('Error fetching active devices')

  if (isPending || !data) return null

  return (
    <section className={cn('flex flex-col gap-y-8', className)}>
      <CardHeader className='p-0'>
        <CardTitle>Active devices</CardTitle>
        <CardDescription>Device kamu yang aktif</CardDescription>
        <Separator className='my-4' />
      </CardHeader>

      <section className='w-full flex flex-col gap-8'>
        {data
          .sort((a, b) => {
            // Always put the current session first
            if (a.id === session.id) return -1
            if (b.id === session.id) return 1

            // Sort by lastActiveAt in descending order
            return new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime()
          })
          .map(({ id, latestActivity }) => {
            const isThisSession = id === session.id

            const isMobile = latestActivity.isMobile

            return (
              <section key={id} className='w-full h-fit flex items-center justify-between'>
                <section className='flex items-center justify-center w-fit h-fit gap-x-4'>
                  {isMobile ? <Smartphone className='w-20 h-20' /> : <Laptop className='w-16 h-16' />}

                  <section className='flex flex-col gap-0'>
                    <section className='flex items-center justify-center w-fit h-fit gap-x-2'>
                      <p className='font-medium'>{latestActivity.deviceType}</p>
                      {isThisSession ? <Badge>This device</Badge> : null}
                    </section>
                    <section className='flex flex-col gap-0 text-muted-foreground text-sm'>
                      <p>
                        {latestActivity.browserName} {latestActivity.browserVersion}
                      </p>
                      <p>
                        {latestActivity.ipAddress} ({latestActivity.city}, {latestActivity.country})
                      </p>
                    </section>
                  </section>
                </section>

                {!isThisSession && (
                  <Button
                    variant='destructive'
                    onClick={async () => {
                      await signOut({ sessionId: id })
                      router.refresh()
                    }}
                    className='flex flex-nowrap'
                  >
                    <span className='whitespace-nowrap overflow-ellipsis'>Sign out</span>
                  </Button>
                )}
              </section>
            )
          })}
      </section>
    </section>
  )
}
