'use client'

import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronUpIcon, LogOut } from 'lucide-react'
import { useClerk } from '@clerk/nextjs'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { useCurrentProfile } from '@repo/web-ui/hooks'
import { posthog } from '@repo/api'
import { EmailText } from './email-text'
import { TidioChatButton } from './tidio-chat-button'
import { menuitem } from './menuitem'

export function Mobile() {
  const pathname = usePathname()

  const router = useRouter()

  const { signOut } = useClerk()

  const dashboard = menuitem[0]
  const personal = menuitem[1]

  const { data: user, isPending } = useCurrentProfile()

  if (isPending) {
    return <Skeleton suppressHydrationWarning className='w-[100svw] h-[76px] fixed bottom-0 left-0' />
  }

  const isMember = user && user.membership && new Date() < new Date(user.membership.endDate)

  return (
    <motion.nav
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className='w-[100svw] h-fit flex justify-between bg-supercuan-primary text-supercuan-secondary fixed bottom-0 left-0 px-2 pt-1 pb-2 shadow-inner select-none z-10'
      suppressHydrationWarning
    >
      {dashboard.items.map((v) => {
        return (
          <motion.button
            type='button'
            whileHover={{
              scale: v.regex.test(pathname ?? '') || !isMember ? 1 : 1.03,
            }}
            whileTap={{ scale: !isMember ? 1 : 1.08 }}
            key={v.id}
            className={cn(
              'w-full flex flex-col items-center rounded-md p-1 m-1 text-sm gap-1 disabled:opacity-50 disabled:cursor-not-allowed',

              (() => {
                if (v.regex.test(pathname ?? '')) {
                  return 'bg-supercuan-secondary text-supercuan-primary'
                }

                return 'hover:bg-primary hover:bg-opacity-20 hover:text-primary-foreground'
              })(),
            )}
            onClick={() => {
              router.push(v.url)
            }}
            disabled={!isMember}
          >
            {v.icon}
            {v.name}
          </motion.button>
        )
      })}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            type='button'
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1.08 }}
            className={cn(
              'w-full flex flex-col items-center rounded-md p-1 m-1 text-sm gap-1',
              personal.items[0].regex.test(pathname ?? '') || personal.items[1].regex.test(pathname ?? '')
                ? 'bg-supercuan-secondary text-supercuan-primary'
                : 'hover:bg-primary hover:bg-opacity-20 hover:text-primary-foreground',
            )}
          >
            <ChevronUpIcon />
            Personal
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn('w-64 px-2 py-1.5')}>
          <DropdownMenuLabel>Personal</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className='w-full h-fit px-2 py-1.5 mb-4'>
            <EmailText />
          </div>

          <nav className='flex flex-col gap-2'>
            {personal.items.map((v) => {
              const disabled = !isMember && v.id === 5

              return (
                <DropdownMenuItem key={v.id} asChild>
                  <motion.button
                    type='button'
                    whileHover={{
                      scale: v.regex.test(pathname ?? '') || disabled ? 1 : 1.03,
                    }}
                    whileTap={{ scale: disabled ? 1 : 1.08 }}
                    className={cn(
                      'w-full flex items-center rounded-md cursor-pointer justify-start p-2 disabled:opacity-50 disabled:cursor-not-allowed',

                      (() => {
                        if (disabled) {
                          return ''
                        }

                        if (v.regex.test(pathname ?? '')) {
                          return 'text-supercuan-secondary bg-supercuan-primary focus:bg-supercuan-primary focus:text-supercuan-secondary'
                        }

                        return 'hover:bg-secondary hover:text-secondary-foreground hover:bg-opacity-20 focus:bg-secondary focus:text-secondary-foreground focus:bg-opacity-20'
                      })(),
                    )}
                    onClick={() => {
                      router.push(v.url)
                    }}
                    disabled={disabled}
                  >
                    <p className='flex items-center justify-center gap-2 font-medium text-base'>
                      {v.icon}
                      {v.name}
                    </p>
                  </motion.button>
                </DropdownMenuItem>
              )
            })}

            <DropdownMenuItem asChild>
              <TidioChatButton />
            </DropdownMenuItem>

            <DropdownMenuItem asChild className='px-0 py-0'>
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 1.08 }}
                className='w-full h-fit'
              >
                <Button
                  type='button'
                  variant='destructive'
                  className={cn('w-full text-base')}
                  onClick={async () => {
                    await signOut()
                    posthog.reset()
                    router.push('/sign-in')
                  }}
                >
                  <LogOut className={cn('w-4 h-4 mr-2')} />
                  Keluar
                </Button>
              </motion.div>
            </DropdownMenuItem>
          </nav>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.nav>
  )
}
