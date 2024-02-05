'use client'

import { LottieAnimation } from '@/components'
import { memo } from 'react'

export const LoadingAnimation = memo(() => {
  return (
    <LottieAnimation
      animationConfig={{
        path: 'https://assets4.lottiefiles.com/packages/lf20_g0rr0uyo.json',
        loop: true,
        autoplay: true,
      }}
      className='w-72 h-fit'
    />
  )
})

LoadingAnimation.displayName = 'LoadingAnimation'
