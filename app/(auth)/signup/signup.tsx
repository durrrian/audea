'use client'

import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Progress1 } from './progress-1'
import { Progress2 } from './progress-2'
import { Progress3 } from './progress-3'
import { LoadingAnimation } from '@/lib/loading-animation'
import { toast } from 'sonner'
import { Progress4 } from './progress-4'
import { Progress5 } from './progress-5'
import { createUser } from './create-user'

export function Signup() {
  const router = useRouter()

  const [progress, setProgress] = useState(1)

  const { isLoaded, signUp, setActive } = useSignUp()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [clerkId, setClerkId] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)

  if (!isLoaded) {
    return (
      <div className='flex h-fit w-full items-center justify-center'>
        <LoadingAnimation className='48' />
      </div>
    )
  }

  return (
    <div className='block lg:p-8'>
      {(() => {
        switch (progress) {
          case 1:
            return (
              <Progress1
                handleNext={(email) => {
                  setEmail(email)
                  setProgress(2)
                }}
              />
            )

          case 2:
            return (
              <Progress2
                handleNext={(password) => {
                  setPassword(password)
                  setProgress(3)
                }}
              />
            )

          case 3:
            return (
              <Progress3
                handleNext={async (firstName, lastName) => {
                  setFirstName(firstName)
                  setLastName(lastName)

                  console.log({
                    emailAddress: email,
                    password,
                    firstName,
                    lastName,
                  })

                  const createUser = async () => {
                    try {
                      await signUp.create({
                        emailAddress: email,
                        password,
                        firstName,
                        lastName,
                      })

                      await signUp.prepareEmailAddressVerification({
                        strategy: 'email_code',
                      })
                    } catch (error: any) {
                      throw new Error(error)
                    }
                  }

                  toast.promise(createUser, {
                    loading: 'Sending OTP...',
                    success: () => {
                      setProgress(4)
                      return 'Success sending OTP!'
                    },
                    error: 'Error sending OTP!',
                  })
                }}
              />
            )

          case 4:
            return (
              <Progress4
                email={email}
                handleNext={async (otpCode) => {
                  const verifiedOtp = async () => {
                    try {
                      const completeSignUp = await signUp.attemptEmailAddressVerification({
                        code: otpCode,
                      })

                      if (completeSignUp.status !== 'complete') {
                        console.log(JSON.stringify(completeSignUp, null, 2))
                        throw new Error('Sign up not complete')
                      }

                      if (completeSignUp.status === 'complete') {
                        if (!signUp.createdUserId) throw new Error('clerkId is undefined')

                        setClerkId(signUp.createdUserId)

                        setProgress(5)
                      }
                    } catch (error: any) {
                      throw new Error(error)
                    }
                  }

                  toast.promise(verifiedOtp, {
                    loading: 'OTP Verification...',
                    success: () => {
                      setProgress(5)
                      return 'Success verifying your OTP!'
                    },
                    error: 'Error verifying your OTP!',
                  })
                }}
              />
            )

          case 5:
            return (
              <Progress5
                handleNewUser={async () => {
                  setLoading(true)

                  try {
                    await createUser(email, clerkId, firstName, lastName)

                    setTimeout(() => {
                      setSuccess(true)
                    }, 1000)

                    await setActive({ session: signUp.createdSessionId })

                    setTimeout(() => {
                      router.push('/new')
                    }, 3000)
                  } catch (error: any) {
                    setSuccess(false)
                  } finally {
                    setLoading(false)
                  }
                }}
                loading={loading}
                success={success}
              />
            )

          default:
            return <></>
        }
      })()}
    </div>
  )
}
