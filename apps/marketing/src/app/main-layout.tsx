'use client'

import { motion, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import cn from '@repo/tailwind-config/cn'
import { usePathname } from 'next/navigation'
import { useWindowSize } from '@repo/web-ui/hooks'
import { Footer } from '~/ui/footer'
import { Header } from '~/ui/header'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()

  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
  })

  const windowSize = useWindowSize()

  const [offset, setOffset] = useState(0)

  const [isNotOverflowing, setIsNotOverflowing] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.9 && !(windowSize.width && windowSize.width < 900)) {
        setOffset(latest)
      } else {
        setOffset(0)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [scrollYProgress, windowSize])

  const listThatShouldBeNotOverflow = ['/article']

  useEffect(() => {
    setIsNotOverflowing(false)

    if (listThatShouldBeNotOverflow.includes(pathname) || (windowSize.width && windowSize.width < 900)) {
      setOffset(0)
      setIsNotOverflowing(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need for more
  }, [pathname, windowSize])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header />

      <motion.div
        ref={ref}
        animate={{
          marginLeft: isNotOverflowing ? 0 : (offset * (windowSize.width ?? 0)) / 20,
          marginRight: isNotOverflowing ? 0 : (offset * (windowSize.width ?? 0)) / 20,
          y: isNotOverflowing ? 0 : -(offset * 400),
        }}
        initial={{ marginLeft: 0, marginRight: 0 }}
        transition={{ type: 'tween', stiffness: 100 }}
        className='bg-supercuan-secondary rounded-3xl z-10 overflow-x-clip max-w-[100dvw] relative'
      >
        <main className='min-w-full pb-40 z-10 relative'>{children}</main>
      </motion.div>

      <div
        className={cn(
          'min-w-[100vw] min-h-[45svh] z-0 bg-supercuan-primary',
          isNotOverflowing ? 'block' : 'fixed bottom-0',
          isNotOverflowing ? 'py-10' : 'pt-60 pb-24',
        )}
      >
        <Footer />
      </div>
    </motion.div>
  )
}
