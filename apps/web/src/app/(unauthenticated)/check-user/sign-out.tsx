'use client'

import { useClerk } from '@clerk/nextjs'
import { parseUrl } from '@repo/helper'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Prop {
  email: string | undefined
}

export function SignOut({ email }: Prop) {
  const { signOut } = useClerk()

  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      const errorStr = 'Please register your email first!'

      await signOut()

      const endpoint = email ? `/sign-up?email=${email}` : '/sign-up'

      router.push(
        parseUrl('web', endpoint, { utm_source: 'google-sign-in-web', error: encodeURIComponent(errorStr) }).href,
      )
    }

    void run()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need to re-run this effect
  }, [])

  // eslint-disable-next-line react/jsx-no-useless-fragment -- no need
  return <></>
}
