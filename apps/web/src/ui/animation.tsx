'use client'

import { LottieAnimation } from '@repo/web-ui/components'
import { memo } from 'react'
import XMark from '@repo/assets/lottie/x-animation-lottiefiles.json'
import LoadingPaperplane from '@repo/assets/lottie/9844-loading-40-paperplane.json'
import Check from '@repo/assets/lottie/success-payment-supercuan.json'

const Failed = memo(() => {
  return (
    <div className='w-full h-full max-w-[300px] max-h-[300px]'>
      <LottieAnimation
        animationConfig={{
          animationData: XMark,
          loop: false,
          autoplay: true,
        }}
      />
    </div>
  )
})
Failed.displayName = 'Failed'

const Loading = memo(() => {
  return (
    <div className='w-full h-full max-w-[400px] max-h-[400px]'>
      <LottieAnimation
        animationConfig={{
          animationData: LoadingPaperplane,
          loop: true,
          autoplay: true,
        }}
      />
    </div>
  )
})
Loading.displayName = 'Loading'

const Success = memo(() => {
  return (
    <div className='w-full h-full max-w-[300px] max-h-[300px]'>
      <LottieAnimation
        animationConfig={{
          animationData: Check,
          loop: false,
          autoplay: true,
        }}
      />
    </div>
  )
})
Success.displayName = 'Success'

export { Failed, Loading, Success }
