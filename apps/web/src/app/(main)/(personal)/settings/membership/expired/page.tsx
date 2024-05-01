import cn from '@repo/tailwind-config/cn'
import { Button, Card } from '@repo/web-ui/components'
import Link from 'next/link'
import { currentProfile } from '@repo/clerk-action'
import { parseUrl } from '@repo/helper'
import { redirect } from 'next/navigation'
import { ChangeAccount } from './change-account'
import { UserInfo } from './user-info'
import { NeedHelp } from './need-help'

export default async function Page() {
  const user = await currentProfile()

  const url = parseUrl('web', '/settings/membership/expired')

  if (!user) return redirect(`/sign-in?redirect_url=${encodeURIComponent(url.href)}`)

  const membership = user.membership

  if (!membership) return redirect('/pick-membership')

  const expiredMembership = membership && new Date() >= new Date(membership.endDate)

  if (!expiredMembership) return redirect('/settings/membership/active')

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto'>
      <Card className={cn('bg-supercuan-secondary md:space-y-20 space-y-10 p-4 select-none')}>
        <section className='grid md:gap-8 gap-4'>
          <h1 className='md:text-3xl text-2xl font-medium'>Maaf, membership anda sudah habis</h1>

          <p className='md:text-lg text-base'>
            Buat dapetin informasi portfolio dari Supercuan Saham, silahkan membeli lagi paket membership yang tersedia
            ya!
          </p>

          <Button className={cn('w-full h-fit text-lg')} type='button' asChild>
            <Link href='/pick-membership' prefetch>
              Lihat paket
            </Link>
          </Button>
        </section>

        <section className='grid gap-4'>
          <NeedHelp />

          <UserInfo />

          <ChangeAccount />
        </section>
      </Card>
    </main>
  )
}
