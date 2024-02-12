import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

interface Prop {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: Prop) {
  return (
    <AuthenticateWithRedirectCallback
      redirectUrl={
        searchParams.redirect_url ? `/login/check-user?redirect_url=${searchParams.redirect_url}` : '/login/check-user'
      }
    />
  )
}
