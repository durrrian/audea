'use client'

import { motion, useAnimation } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronsLeft, ChevronsRight, LogOut } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'
import cn from '@repo/tailwind-config/cn'
import { Button, Skeleton } from '@repo/web-ui/components'
import Image from 'next/image'
import { useCurrentProfile } from '@repo/web-ui/hooks'
import { posthog } from '@repo/api'
import LogoOnly from '@repo/assets/logo/logo_only_white.svg'
import TextOnly from '@repo/assets/logo/text_only_white.svg'
import { useSidebar } from '~/hooks/use-sidebar'
import { TidioChatButton } from './tidio-chat-button'
import { EmailText } from './email-text'
import { menuitem } from './menuitem'

export function Desktop() {
  const pathname = usePathname()

  const { signOut } = useClerk()

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  const router = useRouter()

  const controls = useAnimation()

  const dashboard = menuitem[0]
  const personal = menuitem[1]

  const { data: user, isPending } = useCurrentProfile()

  if (isPending) {
    return (
      <Skeleton
        suppressHydrationWarning
        className={cn('h-[100svh] fixed inset-0', isSidebarOpen ? 'w-[300px]' : 'w-[100px]')}
      />
    )
  }

  const isMember = user && user.membership && new Date() < new Date(user.membership.endDate)

  return (
    <motion.aside
      className='bg-supercuan-primary text-supercuan-secondary flex flex-col justify-between fixed top-0 left-0 shadow-inner px-6 pt-14 pb-8 select-none h-[100svh] z-10'
      animate={isSidebarOpen ? 'open' : 'closed'}
      variants={{ open: { width: 300 }, closed: { width: 100 } }}
      suppressHydrationWarning
    >
      <div className='space-y-10'>
        <motion.header
          className={cn('flex items-center justify-between gap-4', isSidebarOpen ? 'flex-row' : 'flex-col')}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <Link className='w-fit h-fit' href='/'>
            <div className='flex items-center justify-center gap-2 w-fit h-fit'>
              <Image src={LogoOnly} alt='' width={35} height={35} draggable={false} />

              {isSidebarOpen ? <Image src={TextOnly} alt='' width={121} height={35} draggable={false} /> : null}
            </div>
          </Link>

          <motion.button
            type='button'
            className='w-fit h-fit'
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen)
              void controls
                .start({
                  opacity: 0,
                  transition: { duration: 0.25 },
                })
                .then(() => {
                  void controls.start({
                    opacity: 1,
                    transition: { duration: 0.25 },
                  })
                })
            }}
          >
            {isSidebarOpen ? <ChevronsLeft className='w-10 h-10' /> : <ChevronsRight className='w-7 h-7' />}
          </motion.button>
        </motion.header>

        {/* Dashboard */}
        <motion.section animate={{ opacity: 1 }} initial={{ opacity: 0 }} className='space-y-4'>
          <div className='space-y-1'>
            <p className={cn('text-sm', !isSidebarOpen ? 'max-w-[52px] truncate' : 'max-w-full')}>{dashboard.name}</p>

            <hr />
          </div>

          <motion.nav animate={{ opacity: 1 }} initial={{ opacity: 0 }} className='flex flex-col gap-4'>
            {dashboard.items.map((v) => {
              return (
                <motion.button
                  type='button'
                  whileHover={{
                    scale: v.regex.test(pathname ?? '') || !isMember ? 1 : 1.05,
                  }}
                  key={v.id}
                  className={cn(
                    'w-full flex items-center rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                    isSidebarOpen ? 'justify-between px-2 py-1.5' : 'justify-center p-2',

                    (() => {
                      if (v.regex.test(pathname ?? '')) {
                        return 'bg-supercuan-secondary text-supercuan-primary'
                      }

                      return 'hover:bg-primary hover:text-primary-foreground hover:bg-opacity-20'
                    })(),
                  )}
                  onClick={() => {
                    router.push(v.url)
                  }}
                  disabled={!isMember}
                >
                  <p
                    className={`flex items-center justify-center gap-2 font-medium ${
                      isSidebarOpen ? 'text-base' : 'text-xl'
                    }`}
                  >
                    {v.icon}
                    {isSidebarOpen ? v.name : ''}
                  </p>
                </motion.button>
              )
            })}
          </motion.nav>
        </motion.section>
      </div>

      {/* Personal */}
      <motion.section animate={{ opacity: 1 }} initial={{ opacity: 0 }} className='space-y-4'>
        <div className='space-y-2'>
          <div className='space-y-1'>
            <p className={cn('text-sm', !isSidebarOpen ? 'max-w-[52px] truncate' : 'max-w-full')}>{personal.name}</p>

            <hr />
          </div>

          {isSidebarOpen ? <EmailText /> : null}
        </div>

        <motion.nav className='flex flex-col gap-4' animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          {personal.items.map((v) => {
            const disabled = !isMember && v.id === 5

            return (
              <motion.button
                type='button'
                whileHover={{
                  scale: v.regex.test(pathname ?? '') || disabled ? 1 : 1.05,
                }}
                key={v.id}
                className={cn(
                  'w-full flex items-center rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                  isSidebarOpen ? 'justify-between px-2 py-1.5' : 'justify-center p-2',
                  (() => {
                    if (disabled) return

                    if (v.regex.test(pathname ?? '')) {
                      return 'bg-supercuan-secondary text-supercuan-primary'
                    }

                    return 'hover:bg-primary hover:text-primary-foreground hover:bg-opacity-20'
                  })(),
                )}
                onClick={() => {
                  router.push(v.url)
                }}
                disabled={disabled}
              >
                <p
                  className={`flex items-center justify-center gap-2 font-medium ${
                    isSidebarOpen ? 'text-base' : 'text-xl'
                  }`}
                >
                  {v.icon}
                  {isSidebarOpen ? v.name : ''}
                </p>
              </motion.button>
            )
          })}

          <TidioChatButton />

          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className='w-full h-fit'
          >
            <Button
              type='button'
              variant='destructive'
              className={cn('w-full', isSidebarOpen ? 'text-sm' : 'text-xl')}
              onClick={async () => {
                await signOut()
                posthog.reset()
                router.push('/sign-in')
              }}
            >
              <LogOut className={cn(isSidebarOpen ? 'w-4 h-4 mr-2' : 'w-6 h-6')} />
              {isSidebarOpen ? 'Keluar' : ''}
            </Button>
          </motion.div>
        </motion.nav>
      </motion.section>
    </motion.aside>
  )
}
