import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getTierFromSearchparam } from '~/lib/get-tier-from-searchparam'
import { SignUp } from './sign-up'

export function generateMetadata(): Metadata {
  return {
    title: 'Supercuan Saham — Daftar Membership Baru',
  }
}

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: PageProps) {
  const { userId } = auth()

  if (userId) return redirect('/')

  const initialEmail =
    searchParams.email && typeof searchParams.email === 'string' ? decodeURIComponent(searchParams.email) : undefined
  const initialMessage =
    searchParams.error && typeof searchParams.error === 'string' ? decodeURIComponent(searchParams.error) : undefined
  const promoCode =
    searchParams.promo_code && typeof searchParams.promo_code === 'string' ? searchParams.promo_code : undefined
  const tier = await getTierFromSearchparam(searchParams.tier)

  return <SignUp initialEmail={initialEmail} initialMessage={initialMessage} tier={tier} promoCode={promoCode} />
}
