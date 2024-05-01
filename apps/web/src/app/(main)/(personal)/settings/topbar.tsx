'use client'

import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Skeleton } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { useCurrentProfile } from '@repo/web-ui/hooks'

const menuitem = [
  {
    id: 1,
    name: 'Akun',
    url: '/settings/account',
    regex: /\/settings\/account(?<temp1>.*)/,
  },
  {
    id: 2,
    name: 'Notifikasi',
    url: '/settings/notification',
    regex: /\/settings\/notification(?<temp1>.*)/,
  },
  {
    id: 3,
    name: 'Membership',
    url: '/settings/membership',
    regex: /\/settings\/membership(?<temp1>.*)/,
  },
  {
    id: 4,
    name: 'Telegram',
    url: '/settings/telegram',
    regex: /\/settings\/telegram(?<temp1>.*)/,
  },
]

export function Topbar() {
  const pathname = usePathname()

  const { data: user, isPending } = useCurrentProfile()

  if (isPending) {
    return (
      <div className='md:px-10 md:pt-10 md:pb-4 p-2 sticky inset-0 z-10 bg-supercuan-secondary shadow-sm select-none flex flex-col gap-4 w-full h-fit'>
        <Skeleton className='w-[180px] h-[40px] rounded-full' />

        <div className='w-full h-fit flex items-center justify-start md:gap-8 gap-4 flex-nowrap overflow-x-auto overflow-y-hidden p-2'>
          {new Array(menuitem.length).fill(0).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key -- no value
            <Skeleton key={i} className='w-[95px] h-[40px] rounded-full' />
          ))}
        </div>
      </div>
    )
  }

  const isMember = user && user.membership && new Date() < new Date(user.membership.endDate)

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className='md:px-10 md:pt-10 md:pb-4 p-2 sticky inset-0 z-10 bg-supercuan-secondary shadow-sm select-none'
    >
      <header className='w-full h-fit bg-supercuan-secondary flex flex-col gap-4'>
        <h1 className='md:text-3xl text-xl flex items-center justify-start gap-2 font-semibold'>
          <Settings className='md:w-10 md:h-10 w-8 h-8' /> Pengaturan
        </h1>
        <nav className='w-full h-fit flex items-center justify-start md:gap-8 gap-4 flex-nowrap overflow-x-auto overflow-y-hidden p-2'>
          {menuitem.map((v) => {
            const active = v.regex.test(pathname)

            const disabled = !isMember && v.id !== 3

            return (
              <Link key={v.id} href={v.url} className='w-fit h-fit'>
                <motion.button
                  whileHover={{ scale: active || disabled ? 1 : 1.05 }}
                  whileTap={{ scale: active || disabled ? 1 : 1.08 }}
                  className={cn(
                    'w-fit h-fit md:px-6 md:py-1.5 px-4 py-1.5 border-2 md:rounded-2xl rounded-xl md:text-lg text-base font-medium shadow-md disabled:cursor-not-allowed',
                    active
                      ? 'bg-supercuan-primary text-supercuan-secondary border-supercuan-primary'
                      : 'bg-supercuan-secondary text-supercuan-greyPrimary border-supercuan-greyPrimary',
                  )}
                  disabled={disabled}
                  tabIndex={-1}
                >
                  {v.name}
                </motion.button>
              </Link>
            )
          })}
        </nav>
      </header>
    </motion.div>
  )
}
