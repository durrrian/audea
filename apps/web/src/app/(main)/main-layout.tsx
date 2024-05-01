'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@repo/web-ui/hooks'
import { useSidebar } from '~/hooks/use-sidebar'
import { Mobile, Desktop } from './sidebar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useSidebar()

  const match: boolean = useMediaQuery('(max-width: 768px)')

  return (
    <Suspense>
      {(() => {
        if (match) {
          return (
            <>
              <Mobile />

              <main className='pb-[73px]'>{children}</main>
            </>
          )
        }

        return (
          <>
            <Desktop />

            <motion.main
              animate={isSidebarOpen && !match ? 'open' : 'closed'}
              variants={{ open: { marginLeft: 300 }, closed: { marginLeft: 100 } }}
            >
              {children}
            </motion.main>
          </>
        )
      })()}
    </Suspense>
  )
}
