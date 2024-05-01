import { clerkClient, currentUser } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'
import { currentProfile } from '@repo/clerk-action'
import { SignOut } from './sign-out'

interface Prop {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: Prop) {
  const redirectUrl = searchParams.redirect_url ? decodeURIComponent(searchParams.redirect_url.toString()) : undefined

  const user = await currentProfile()

  if (!user) {
    const clerkUser = await currentUser()

    if (!clerkUser) return notFound()

    const clerkEmailAddress = clerkUser.emailAddresses.find((v) => v.id === clerkUser.primaryEmailAddressId)

    const emailAddress = clerkEmailAddress ? clerkEmailAddress.emailAddress : undefined

    await clerkClient.users.deleteUser(clerkUser.id)

    return <SignOut email={emailAddress} />
  }

  if (redirectUrl) return redirect(redirectUrl)

  return redirect('/')
}
