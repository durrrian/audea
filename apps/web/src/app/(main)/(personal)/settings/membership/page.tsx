import { redirect } from 'next/navigation'
import { currentProfile } from '@repo/clerk-action'
import { parseUrl } from '@repo/helper'

export default async function Page() {
  const user = await currentProfile()

  const url = parseUrl('web', '/settings/membership')

  if (!user) return redirect(`/sign-in?redirect_url=${encodeURIComponent(url.href)}`)

  const membership = user.membership

  if (!membership) return redirect('/pick-membership')

  const expiredMembership = membership && new Date() >= new Date(membership.endDate)

  if (expiredMembership) return redirect('/settings/membership/expired')

  return redirect('/settings/membership/active')
}
