import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { currentProfile } from '@repo/clerk-action'
import { parseUrl } from '@repo/helper'
import { prisma } from '@repo/prisma'
import { getTierFromSearchparam } from '~/lib/get-tier-from-searchparam'
import { PickMembership } from './pick-membership'

export function generateMetadata(): Metadata {
  return {
    title: 'Supercuan Saham — Pilih Membership',
  }
}

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: PageProps) {
  const user = await currentProfile()

  if (!user) {
    const url = parseUrl('web', '/pick-membership').href.toString()

    return redirect(`/sign-in?redirect_url=${encodeURIComponent(url)}`)
  }

  if (user.membership && new Date() >= new Date(user.membership.endDate)) return redirect('/settings/membership')

  if (user.membership && new Date() < new Date(user.membership.endDate)) return redirect('/')

  const promoCode =
    searchParams.promo_code && typeof searchParams.promo_code === 'string' ? searchParams.promo_code : undefined
  const tier = await getTierFromSearchparam(searchParams.tier)

  if (tier) {
    const url = parseUrl('web', '/pay')
    url.searchParams.set('tier', tier)
    if (promoCode) url.searchParams.set('promo_code', promoCode)
    return redirect(url.href)
  }

  const allPrices = await prisma.prices.findMany({ orderBy: { price: 'asc' } })

  return <PickMembership promoCode={promoCode} prices={allPrices} />
}
