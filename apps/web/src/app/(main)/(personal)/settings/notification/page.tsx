import { redirect } from 'next/navigation'
import { Card, CardDescription, CardHeader, CardTitle } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { prisma } from '@repo/prisma'
import { currentProfile } from '@repo/clerk-action'
import { Notification } from './notification'

export default async function Page() {
  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  const membership = user.membership

  if (!membership) return redirect('/sign-up/flow/1')

  if (membership && new Date() >= new Date(membership.endDate)) return redirect('/settings/membership')

  const notification = await prisma.emailNotification.findFirstOrThrow({ where: { userId: user.id } })

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto'>
      <Card className={cn('bg-supercuan-secondary space-y-10 lg:p-14 md:p-8 p-4 overflow-hidden z-10 select-none')}>
        <CardHeader className='p-0'>
          <CardTitle>Notifikasi</CardTitle>
          <CardDescription>Atur preferensi email pemberitahuan yang anda inginkan</CardDescription>
        </CardHeader>

        <Notification notification={notification} />
      </Card>
    </main>
  )
}
