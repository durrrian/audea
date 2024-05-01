'use client'

import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export function ChangeAccount() {
  const router = useRouter()

  const { signOut } = useClerk()

  return (
    <p>
      Mau ganti akun?{' '}
      <button
        className='underline text-supercuan-primary'
        onClick={async () => {
          await signOut()
          router.push('/sign-in')
        }}
        type='button'
      >
        keluar
      </button>
    </p>
  )
}
