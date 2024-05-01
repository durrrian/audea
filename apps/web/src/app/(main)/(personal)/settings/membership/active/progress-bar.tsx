'use client'

import { formatDate } from '@repo/helper'
import type { Membership } from '@repo/prisma/client'
import cn from '@repo/tailwind-config/cn'
import { motion } from 'framer-motion'
import { membershipMetadata } from '~/lib/membership-metadata'

interface ProgressBarProps {
  membership: Membership
}

export function ProgressBar({ membership }: ProgressBarProps) {
  const { remainingDays, remainingMonths, totalDuration, remainingTime, isLessThan7Days, isLessThan1Month } =
    membershipMetadata(membership)

  const to = `${((totalDuration - remainingTime) / totalDuration) * 100}%`

  return (
    <section className='flex flex-col gap-2 w-full h-fit'>
      <p className='text-left text-muted-foreground font-light'>
        Membership anda akan habis di {formatDate(new Date(membership.endDate), 'long', false)}
      </p>

      <div className='min-w-full h-fit bg-gray-400 rounded-full overflow-hidden'>
        <motion.div
          className={cn('h-[30px] rounded-full', isLessThan7Days ? 'bg-red-400' : 'bg-green-400')}
          animate={{ width: to }}
          initial={{ width: 0 }}
          transition={{ duration: 2 }}
        />
      </div>

      <p className={cn('text-right font-light', isLessThan7Days ? 'text-destructive' : 'text-muted-foreground')}>
        {isLessThan1Month ? `${remainingDays} hari lagi` : `${remainingMonths} bulan lagi `}
      </p>
    </section>
  )
}
