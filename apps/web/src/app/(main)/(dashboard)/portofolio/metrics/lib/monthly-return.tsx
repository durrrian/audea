'use client'

import type { ReturnVsIndex } from '@repo/prisma/client'
import cn from '@repo/tailwind-config/cn'
import TextDisplay from '../component/text-display'

interface MonthlyReturnProps {
  returnVsIndex: ReturnVsIndex[]
}

export function MonthlyReturn({ returnVsIndex }: MonthlyReturnProps) {
  const length = returnVsIndex.length

  const startPeriodReturnVsIndex = returnVsIndex[length - 2]
  const endPeriodReturnVsIndex = returnVsIndex[length - 1]

  const title = 'Monthly return'
  const subtitle = `Return ${endPeriodReturnVsIndex.period} vs ${startPeriodReturnVsIndex.period}`

  const displayReturn = endPeriodReturnVsIndex.supercuan

  return (
    <TextDisplay title={title} subtitle={subtitle} withSelect={false}>
      <div className='flex w-full items-center justify-start'>
        <p className={cn('text-xl font-medium md:text-2xl', displayReturn >= 0 ? 'text-green-600' : 'text-red-600')}>
          {displayReturn}%
        </p>
      </div>
    </TextDisplay>
  )
}
