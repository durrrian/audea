import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { currentProfile } from '@repo/clerk-action'
import { parseUrl } from '@repo/helper'
import { prisma } from '@repo/prisma'
import { getTierFromSearchparam } from '~/lib/get-tier-from-searchparam'
import { transactionToken } from '~/lib/transaction-token'
import { Pay } from './pay'

export function generateMetadata(): Metadata {
  return {
    title: 'Supercuan Saham — Bayar',
  }
}

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: PageProps) {
  const user = await currentProfile()

  if (!user) {
    const url = parseUrl('web', '/pay').href.toString()

    return redirect(`/sign-in?redirect_url=${encodeURIComponent(url)}`)
  }

  if (user.membership && new Date() >= new Date(user.membership.endDate)) return redirect('/settings/membership')

  if (user.membership && new Date() < new Date(user.membership.endDate)) return redirect('/')

  const promoCode =
    searchParams.promo_code && typeof searchParams.promo_code === 'string' ? searchParams.promo_code : null

  const tier = await getTierFromSearchparam(searchParams.tier)

  if (!tier) return redirect('/pick-membership')

  const price = await prisma.prices.findFirst({ where: { tier } })

  if (!price) return redirect('/pick-membership')

  const { token, promoData } = await transactionToken(price, promoCode, user)

  return <Pay promoData={promoData} price={price} promoCode={promoCode} token={token} />
}
