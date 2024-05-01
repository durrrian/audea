import { membershipPrice } from '@repo/api'
import { parseUrl } from '@repo/helper'
import cn from '@repo/tailwind-config/cn'
import { Card } from '@repo/web-ui/components'
import { Fireworks, TierPill } from '@repo/web-ui/lib'
import { redirect } from 'next/navigation'
import { currentProfile } from '@repo/clerk-action'
import { PaymentDialog } from '~/ui/payment-dialog'
import { SnapJS } from '~/lib/snap-js'
import { ProgressBar } from './progress-bar'
import { LessThan7Days } from './less-than-7days'
import { Perpanjang } from './perpanjang'
import { Upgrade } from './upgrade'

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: PageProps) {
  const user = await currentProfile()

  const promoCode =
    searchParams.promo_code && typeof searchParams.promo_code === 'string' ? searchParams.promo_code : null

  const token = searchParams.token && typeof searchParams.token === 'string' ? searchParams.token : null

  const url = parseUrl('web', '/settings/membership/active')

  if (promoCode) url.searchParams.set('promo_code', promoCode)

  if (!user) return redirect(`/sign-in?redirect_url=${encodeURIComponent(url.href)}`)

  const membership = user.membership

  if (!membership) return redirect('/pick-membership')

  const expiredMembership = membership && new Date() >= new Date(membership.endDate)

  if (expiredMembership) return redirect('/settings/membership/expired')

  const allPrices = await membershipPrice()

  const currentPrice = allPrices.filter((price) => price.tier === membership.tier)[0]

  return (
    <>
      <SnapJS />

      <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto'>
        <Card className={cn('bg-supercuan-secondary space-y-10 p-4 overflow-hidden z-10 select-none')}>
          <header className='space-y-4'>
            <h1 className='text-2xl font-semibold'>Membership</h1>

            <section className='w-full h-fit flex items-center justify-between gap-x-10 gap-y-4 flex-wrap'>
              <h2 className='text-lg font-medium'>Tipe membership anda sekarang</h2>

              <TierPill tier={membership.tier} />
            </section>
          </header>

          <ProgressBar membership={membership} />

          <section className='w-full flex items-center justify-center h-fit gap-x-10 gap-y-4 flex-wrap'>
            <Perpanjang membership={membership} price={currentPrice} promoCode={promoCode} user={user} />

            <Upgrade membership={membership} prices={allPrices} promoCode={promoCode} user={user} />
          </section>

          <LessThan7Days membership={membership} />

          {membership.tier === 'PLATINUM' && (
            <div className='min-w-full min-h-full absolute inset-0 z-[-1]'>
              <Fireworks />
            </div>
          )}
        </Card>
      </main>

      {token ? <PaymentDialog token={token} open /> : null}
    </>
  )
}
