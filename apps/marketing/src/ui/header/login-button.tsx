'use client'

import { posthogCapture } from '@repo/api'
import { parseUrl } from '@repo/helper'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

interface LoginButtonProps {
  isScroll?: boolean
}

export function LoginButton({ isScroll }: LoginButtonProps) {
  return (
    <Link href={parseUrl('web', '/sign-in', { utm_source: 'nav-marketing' })} target='_blank'>
      <motion.button
        animate={isScroll ? 'whenScrolled' : 'whenNotScrolled'}
        variants={{
          whenScrolled: {
            scale: 1.1,
            boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
          },
          whenNotScrolled: { scale: 1 },
          hover: { backgroundColor: 'black' },
        }}
        whileHover='hover'
        className='fixed top-10 md:right-6 right-2 bg-supercuan-primary px-4 py-1.5 rounded-md text-supercuan-secondary flex items-center justify-center gap-2 font-medium'
        type='button'
        tabIndex={-1}
        onClick={() => {
          posthogCapture('login_button_clicked', { location: 'nav-marketing' })
        }}
      >
        <motion.span
          variants={{
            initial: {
              rotateX: 0,
            },
            hover: {
              rotateX: [0, -10, -20, -30, -40, -50, -60, -70, -80, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0],
            },
          }}
          transition={{ duration: 0.4 }}
        >
          Login
        </motion.span>
        <LogIn className='w-4 h-4' />
      </motion.button>
    </Link>
  )
}
