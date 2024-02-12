import { LottieAnimation } from '@/components'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface Props {
  handleNewUser: () => void
  loading: boolean
  success: boolean | null
}

export function Progress5({ handleNewUser, loading, success }: Props) {
  useEffect(() => {
    handleNewUser()
  }, [])

  return (
    <motion.section
      className='mx-auto flex max-w-[400px] flex-col items-center justify-center gap-8 px-4 pb-10 sm:px-0'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {(() => {
        if (loading && success === null) {
          return (
            <>
              <div className='h-fit max-h-[200px] w-fit max-w-[300px]'>
                <LottieAnimation
                  animationConfig={{
                    path: '/lottie/9844-loading-40-paperplane.json',
                    loop: true,
                    autoplay: true,
                  }}
                />
              </div>
              <h3 className='text-center text-xl font-medium'>Creating your account...</h3>
            </>
          )
        }

        if (success === true && !loading) {
          return (
            <>
              <div className='h-fit max-h-[200px] w-fit max-w-[300px]'>
                <LottieAnimation
                  animationConfig={{
                    path: '/lottie/96237-success.json',
                    loop: true,
                    autoplay: true,
                  }}
                />
              </div>
              <h3 className='text-center text-xl font-medium'>Success! Redirecting you...</h3>
            </>
          )
        }

        if (success === false) {
          return (
            <>
              <div className='h-fit max-h-[200px] w-fit max-w-[200px]'>
                <LottieAnimation
                  animationConfig={{
                    path: '/lottie/91878-bouncy-fail.json',
                    loop: true,
                    autoplay: true,
                  }}
                />
              </div>
              <h3 className='text-center text-xl font-medium'>Error connecting to the server!</h3>
            </>
          )
        }
      })()}
    </motion.section>
  )
}
