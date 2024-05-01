'use client'

import cn from '@repo/tailwind-config/cn'
import { memo } from 'react'
import { LottieAnimation } from '../components'

export const LoadingAnimation = memo(({ className }: { className?: string }) => {
  return (
    <LottieAnimation
      animationConfig={{
        path: 'https://assets4.lottiefiles.com/packages/lf20_g0rr0uyo.json',
        loop: true,
        autoplay: true,
      }}
      className={cn('h-fit w-72', className)}
    />
  )
})

LoadingAnimation.displayName = 'LoadingAnimation'
