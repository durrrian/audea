'use client'

import { useSignIn } from '@clerk/nextjs'
import { SignInFirstFactor, SignInResource } from '@clerk/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FirstSequence } from './first-sequence'
import { EmailCode } from './email-code'
import { ChooseFirstFactor } from './choose-first-factor'
import { toast } from 'sonner'
import { ForgotPassword } from './forgot-password'
import Password from './password'
import { LoadingAnimation } from '@/lib/loading-animation'

export function Login({ redirectUrl }: { redirectUrl: string | undefined }) {
  const router = useRouter()
  const { isLoaded, signIn, setActive } = useSignIn()

  const [progress, setProgress] = useState('initial')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [firstFactors, setFirstFactors] = useState<SignInFirstFactor[]>([])

  const [signInData, setSignInData] = useState<SignInResource>({} as SignInResource)

  if (!isLoaded) {
    return (
      <div className='flex h-fit w-full items-center justify-center'>
        <LoadingAnimation className='48' />
      </div>
    )
  }

  const handleEditEmail = () => {
    setEmail('')
    setFirstFactors([])
    setSignInData({} as SignInResource)
    setErrorMsg(null)
    setLoading(false)
    setProgress('initial')
  }

  switch (progress) {
    case 'initial':
      return (
        <FirstSequence
          onSubmit={async (e) => {
            e.preventDefault()

            const formData = new FormData(e.currentTarget)
            const emailForm = formData.get('email')

            if (!emailForm) {
              return
            }

            try {
              setLoading(true)
              setErrorMsg(null)

              const data = await signIn.create({
                identifier: emailForm.toString(),
              })

              setSignInData(data as SignInResource)

              const firstFactor = data.supportedFirstFactors
                .filter(({ strategy }) => strategy !== 'reset_password_email_code')
                .sort((valA, valB) => {
                  const a = valA as any
                  const b = valB as any

                  if (a.primary) {
                    return -1 // Move a to the top
                  } else if (b.primary) {
                    return 1 // Move b to the top
                  } else {
                    return 0 // Maintain the original order
                  }
                })

              setLoading(false)

              setEmail(emailForm.toString())
              setFirstFactors(firstFactor)
              setProgress('choose-first-factor')
            } catch (error) {
              setLoading(false)

              const err = JSON.parse(JSON.stringify(error))

              if (err && err.hasOwnProperty('clerkError') && err.hasOwnProperty('errors') && err.errors.length > 0) {
                setErrorMsg(err.errors[0].longMessage)
              }
            }
          }}
          loading={loading}
          errorMsg={errorMsg}
          redirectUrl={redirectUrl}
        />
      )

    case 'choose-first-factor':
      return (
        <ChooseFirstFactor
          email={email}
          firstFactors={firstFactors}
          handleEditEmail={handleEditEmail}
          handleEmailCode={async () => {
            setProgress('email-code')

            toast.promise(
              (async () => {
                try {
                  const emailFirstFactor = firstFactors.find(({ strategy }) => {
                    return strategy === 'email_code'
                  })

                  if (!emailFirstFactor) return

                  const { emailAddressId }: { emailAddressId: string } = emailFirstFactor as never

                  await signInData.prepareFirstFactor({
                    strategy: 'email_code',
                    emailAddressId,
                  })
                } catch (error) {
                  console.log(JSON.parse(JSON.stringify(error)))
                }
              })(),
              {
                loading: 'Sending one-time code...',
                success: 'One-time code sent!',
                error: 'Error sending one-time code!',
              },
            )
          }}
          handlePassword={() => setProgress('password')}
          handleGoogle={() => {
            signInData.authenticateWithRedirect({
              strategy: 'oauth_google',
              redirectUrl: redirectUrl ? `/login/sso-callback?redirect_url=${redirectUrl}` : '/login/sso-callback',
              redirectUrlComplete: redirectUrl ? `/login/check-user?redirect_url=${redirectUrl}` : '/login/check-user',
            })
          }}
        />
      )

    case 'email-code':
      return (
        <EmailCode
          email={email}
          handleSubmit={async (e) => {
            e.preventDefault()

            const formData = new FormData(e.currentTarget)

            const otpArr: string[] = []

            for (let i = 0; i < 6; i++) {
              const otpForm = formData.get(`otp-${i}`)

              if (otpForm) {
                otpArr.push(otpForm.toString())
              }
            }
            const code = otpArr.join('')

            try {
              setLoading(true)
              setErrorMsg(null)

              await signInData.attemptFirstFactor({
                strategy: 'email_code',
                code,
              })

              await setActive({
                session: signInData.createdSessionId,
              })

              router.push(redirectUrl ? decodeURIComponent(redirectUrl) : '/new')

              setLoading(false)
            } catch (e) {
              setLoading(false)
              const error = JSON.parse(JSON.stringify(e))

              if (
                error &&
                error.hasOwnProperty('clerkError') &&
                error.hasOwnProperty('errors') &&
                error.errors.length > 0
              ) {
                setErrorMsg(error.errors[0].longMessage)

                setTimeout(() => {
                  if (error.errors[0].code === 'verification_expired') {
                    setErrorMsg(null)
                    setProgress('initial')
                  }
                }, 2000)
              }
            }
          }}
          loading={loading}
          errorMsg={errorMsg}
          handleEditEmail={handleEditEmail}
        />
      )

    case 'password':
      return (
        <Password
          email={email}
          handleSubmit={async (e) => {
            e.preventDefault()

            const formData = new FormData(e.currentTarget)
            const passwordForm = formData.get('password')

            if (!passwordForm) return

            try {
              setLoading(true)
              setErrorMsg(null)

              const password = passwordForm.toString()

              const result = await signIn.create({
                identifier: email,
                password,
              })

              if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId })
                router.push(redirectUrl ? decodeURIComponent(redirectUrl) : '/new')
              }

              setLoading(false)
            } catch (error) {
              setLoading(false)
              const e = JSON.stringify(error)
              const err = JSON.parse(e)

              if (err && err.hasOwnProperty('clerkError') && err.hasOwnProperty('errors') && err.errors.length > 0) {
                setErrorMsg(err.errors[0].longMessage)
              }
            }
          }}
          loading={loading}
          errorMsg={errorMsg}
          handleEditEmail={handleEditEmail}
          onForgotPassword={async () => {
            setProgress('forgot-password')

            toast.promise(
              (async () => {
                try {
                  await signIn.create({
                    strategy: 'reset_password_email_code',
                    identifier: email,
                  })
                } catch (error) {
                  console.log(JSON.parse(JSON.stringify(error)))
                }
              })(),
              {
                loading: 'Sending one-time code...',
                success: 'One-time code sent!',
                error: 'Error sending one-time code!',
              },
            )
          }}
        />
      )

    case 'forgot-password':
      return (
        <ForgotPassword
          email={email}
          handleSubmit={async (e) => {
            e.preventDefault()

            const formData = new FormData(e.currentTarget)

            const passwordForm = formData.get('password')

            if (!passwordForm) return

            const otpArr: string[] = []

            for (let i = 0; i < 6; i++) {
              const otpForm = formData.get(`otp-${i}`)

              if (otpForm) {
                otpArr.push(otpForm.toString())
              }
            }

            const code = otpArr.join('')
            const password = passwordForm.toString()

            try {
              setLoading(true)
              setErrorMsg(null)

              const result = await signIn.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
              })

              if (result.status === 'complete') {
                await setActive({
                  session: signInData.createdSessionId,
                })

                router.push(redirectUrl ? decodeURIComponent(redirectUrl) : '/new')
              }

              setLoading(false)
            } catch (e) {
              setLoading(false)
              const error = JSON.parse(JSON.stringify(e))

              if (
                error &&
                error.hasOwnProperty('clerkError') &&
                error.hasOwnProperty('errors') &&
                error.errors.length > 0
              ) {
                setErrorMsg(error.errors[0].longMessage)

                setTimeout(() => {
                  if (error.errors[0].code === 'verification_expired') {
                    setErrorMsg(null)
                    setProgress('initial')
                  }
                }, 2000)
              }
            }
          }}
          loading={loading}
          errorMsg={errorMsg}
        />
      )

    default:
      return <></>
  }
}
