import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { SignIn } from './sign-in'

export function generateMetadata(): Metadata {
  return {
    title: 'Supercuan Saham — Login',
  }
}

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default function Page({ searchParams }: PageProps) {
  const { userId } = auth()

  if (userId) return redirect('/')

  return (
    <SignIn
      className='mt-8'
      redirectUrlParam={
        searchParams.redirect_url && typeof searchParams.redirect_url === 'string'
          ? searchParams.redirect_url
          : undefined
      }
    />
  )
}
