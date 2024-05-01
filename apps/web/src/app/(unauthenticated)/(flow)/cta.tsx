'use client'

import { posthogCapture } from '@repo/api'
import { LogIn, Pen } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Cta() {
  const pathname = usePathname()

  const isSignIn = pathname?.startsWith('/sign-in')

  return (
    <Link href={isSignIn ? '/sign-up' : '/sign-in'} className='w-fit h-fit'>
      <button
        type='button'
        className='bg-supercuan-primary px-4 py-1.5 rounded-md text-supercuan-secondary flex items-center justify-center gap-2 font-medium'
        onClick={() => {
          if (isSignIn) {
            posthogCapture('register_button_clicked', { location: 'nav-onsignup-web' })
          } else {
            posthogCapture('login_button_clicked', { location: 'nav-onsignin-web' })
          }
        }}
      >
        {(() => {
          if (isSignIn) {
            return (
              <>
                <span>Join</span>
                <Pen className='w-4 h-4' />
              </>
            )
          }

          return (
            <>
              <span>Masuk</span>
              <LogIn className='w-4 h-4' />
            </>
          )
        })()}
      </button>
    </Link>
  )
}
