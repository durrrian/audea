'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import cn from '@repo/tailwind-config/cn'
import Link from 'next/link'
import { LoadingSpinner } from '@repo/web-ui/components'
import { useCurrentProfile, useWindowSize } from '@repo/web-ui/hooks'
import { ScrollLogoPrimary } from './scroll-logo-primary'
import { UserAvatarNav } from './user-avatar-nav'
import { LoginButton } from './login-button'

export function Header() {
  const [isScroll, setIsScroll] = useState(false)

  const pathname = usePathname()

  const { width } = useWindowSize()

  const isMobile = Boolean(width && width < 900)

  const { data, isError, isPending } = useCurrentProfile()

  const headerLinks = [
    { link: '#service', text: 'Service' },
    { link: '#about', text: 'About' },
    { link: '#membership', text: 'Membership' },
    { link: '#tools', text: 'Tools' },
    { link: '#testimonial', text: 'Testimonial' },
    { link: '/article', text: 'Article' },
  ]

  const [hoverLink, setHoverLink] = useState<number | null>(null)

  useEffect(() => {
    // Function to update scrollYProgress
    const updateScrollYProgress = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const scrollYProgress = scrollY / (documentHeight - windowHeight)

      if (scrollYProgress > 0) {
        setIsScroll(true)
      }

      if (scrollYProgress === 0) {
        setIsScroll(false)
      }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', updateScrollYProgress)

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', updateScrollYProgress)
    }
  }, [])

  return (
    <header
      className={cn(
        'bg-supercuan-secondary w-full h-fit px-0 z-50 relative select-none',
        pathname === '/' ? 'py-10' : 'py-[3.30rem]',
        isMobile ? 'py-[3.30rem]' : '',
      )}
    >
      {(() => {
        if (pathname === '/') {
          return (
            <button
              className='w-fit h-fit fixed inset-0 top-8 md:left-4 left-2 flex items-center justify-center'
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              type='button'
            >
              <ScrollLogoPrimary isScroll={isScroll} />
            </button>
          )
        }

        return (
          <Link href='/' className='w-fit h-fit fixed inset-0 top-8 md:left-4 left-2 flex items-center justify-center'>
            <ScrollLogoPrimary isScroll={isScroll} />
          </Link>
        )
      })()}

      {pathname === '/' && !isMobile && (
        <div className='flex items-center justify-center gap-6 w-full h-fit'>
          {headerLinks.map(({ link, text }, id) => {
            return (
              <motion.a
                key={link}
                href={link}
                onMouseEnter={() => {
                  setHoverLink(id)
                }}
                onMouseLeave={() => {
                  setHoverLink(null)
                }}
                className='opacity-50 hover:opacity-100 focus:opacity-100'
                onFocus={() => {
                  setHoverLink(id)
                }}
              >
                <span className='flex items-center justify-center'>
                  {text}
                  {/* Article */}
                  {id === 5 && <ExternalLink className='ml-2 w-4 h-4' />}
                </span>
                {hoverLink === id && (
                  <motion.div
                    className='bg-supercuan-primary'
                    initial={{ width: '0%', height: 0 }}
                    animate={{ width: '100%', height: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {hoverLink !== id && <div className='bg-white w-0 h-[2px]' />}
              </motion.a>
            )
          })}
        </div>
      )}

      {(() => {
        if (isPending) {
          return (
            <div className='fixed top-8 md:right-6 right-2 w-fit h-fit rounded-full flex items-center justify-center'>
              <LoadingSpinner className='w-10 h-10 text-gray-200 fill-blue-500' />
            </div>
          )
        }

        if (isError || !data) {
          return <LoginButton isScroll={isScroll} />
        }

        return <UserAvatarNav isScroll={isScroll} user={data} />
      })()}
    </header>
  )
}
