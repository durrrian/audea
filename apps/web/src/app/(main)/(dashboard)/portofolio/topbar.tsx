'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import cn from '@repo/tailwind-config/cn'

const menuitem = [
  {
    id: 1,
    name: 'Daftar portofolio',
    url: '/portofolio/all',
    regex: /\/portofolio\/all(?<temp1>.*)/,
  },
  {
    id: 2,
    name: 'Metrics',
    url: '/portofolio/metrics',
    regex: /\/portofolio\/metrics(?<temp1>.*)/,
  },
  {
    id: 3,
    name: 'Transaksi',
    url: '/portofolio/transaksi',
    regex: /\/portofolio\/transaksi(?<temp1>.*)/,
  },
  {
    id: 4,
    name: 'Dividen',
    url: '/portofolio/dividen',
    regex: /\/portofolio\/dividen(?<temp1>.*)/,
  },
]

export function Topbar() {
  const pathname = usePathname()

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className='md:px-10 md:pt-10 md:pb-4 p-2 sticky inset-0 z-10 bg-supercuan-secondary shadow-sm select-none'
    >
      <nav className='w-full h-fit flex items-center justify-start md:gap-8 gap-4 flex-nowrap overflow-x-auto overflow-y-hidden p-2 bg-supercuan-secondary'>
        {menuitem.map((v) => {
          const active = v.regex.test(pathname)

          return (
            <Link key={v.id} href={v.url} className='w-fit h-fit'>
              <motion.button
                whileHover={{ scale: active ? 1 : 1.05 }}
                whileTap={{ scale: active ? 1 : 1.08 }}
                className={cn(
                  'w-fit h-fit md:px-6 md:py-1.5 px-4 py-1.5 border-2 md:rounded-2xl rounded-xl md:text-lg text-base font-medium shadow-md disabled:cursor-not-allowed whitespace-nowrap',
                  active
                    ? 'bg-supercuan-primary text-supercuan-secondary border-supercuan-primary'
                    : 'bg-supercuan-secondary text-supercuan-greyPrimary border-supercuan-greyPrimary',
                )}
              >
                {v.name}
              </motion.button>
            </Link>
          )
        })}
      </nav>
    </motion.div>
  )
}
