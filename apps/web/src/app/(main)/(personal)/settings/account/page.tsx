import cn from '@repo/tailwind-config/cn'
import { Card, CardDescription, CardHeader, CardTitle } from '@repo/web-ui/components'
import { currentProfile } from '@repo/clerk-action'
import { redirect } from 'next/navigation'
import { Profile } from './profile'
import { ActiveDevices } from './active-devices'

export default async function Page() {
  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  return (
    <main className='w-full max-w-[1100px] mx-auto h-fit mt-10 mb-20 select-none px-2'>
      <Card className={cn('bg-supercuan-secondary space-y-10 lg:p-16 md:p-10 p-6 overflow-hidden z-10 select-none')}>
        <CardHeader className='p-0'>
          <CardTitle>Akun</CardTitle>
          <CardDescription>Manage segala hal tentang akun Supercuan Saham kamu!</CardDescription>
        </CardHeader>

        <section className='flex flex-col gap-y-10'>
          <Profile user={user} />

          <ActiveDevices user={user} />
        </section>
      </Card>
    </main>
  )
}
