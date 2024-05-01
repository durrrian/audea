import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

interface Prop {
  searchParams: Record<string, string | string[] | undefined>
}

export default function Page({ searchParams }: Prop) {
  const redirectUrl = searchParams.redirect_url ? decodeURIComponent(searchParams.redirect_url.toString()) : undefined

  const url = redirectUrl ? `/check-user?redirect_url=${redirectUrl}` : '/check-user'

  return (
    <AuthenticateWithRedirectCallback
      afterSignInUrl={url}
      continueSignUpUrl={url}
      afterSignUpUrl={url}
      redirectUrl={url}
    />
  )
}
