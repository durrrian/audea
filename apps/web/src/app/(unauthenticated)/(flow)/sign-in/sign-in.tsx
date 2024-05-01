/* eslint-disable @typescript-eslint/no-unsafe-member-access -- for error */

'use client'

import cn from '@repo/tailwind-config/cn'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  OTPInput,
} from '@repo/web-ui/components'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { posthogCapture } from '@repo/api'
import Link from 'next/link'
import { parseUrl } from '@repo/helper'
import { FcGoogle } from 'react-icons/fc'
import { useSignIn } from '@clerk/nextjs'
import type { MouseEventHandler } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ZEmail, ZOtp } from '~/lib/form-schema'
import { LoadingForm } from './loading-form'

interface SignInProps {
  redirectUrlParam: string | undefined
  className?: string
}

const FormSchema = z.object({ email: ZEmail, otp: ZOtp })

export function SignIn({ redirectUrlParam, className }: SignInProps) {
  const { isLoaded, signIn, setActive } = useSignIn()

  const [progress, setProgress] = useState<'INITIAL' | 'OTP'>('INITIAL')

  const [sendingOtp, setSendingOtp] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    values: { email: '', otp: '' },
    mode: 'all',
    resolver: zodResolver(FormSchema),
  })

  // const email = form.watch('email')

  if (!isLoaded) return <LoadingForm />

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code: data.otp,
      })

      await setActive({
        session: signIn.createdSessionId,
      })

      router.push(redirectUrlParam ? `/check-user?redirect_url=${redirectUrlParam}` : '/check-user')
      // router.push(redirectUrlParam ? decodeURIComponent(redirectUrlParam) : '/')
    } catch (error) {
      console.error(error)

      const isClerkError = 'errors' in error && Array.isArray(error.errors)

      if (!isClerkError) {
        form.setError('root', { message: 'An error occured' })
        return
      }

      form.setError('root', { message: error.errors[0].longMessage })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises -- onSendOtp
  const onSendOtp: MouseEventHandler<HTMLButtonElement> = async () => {
    setSendingOtp(true)
    form.clearErrors()

    try {
      const data = await signIn.create({
        identifier: form.getValues('email'),
      })

      const emailFirstFactor = data.supportedFirstFactors.find(({ strategy }) => {
        return strategy === 'email_code'
      })

      if (!emailFirstFactor) {
        form.setError('root', { message: 'Unable to send OTP' })
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- it exist
      const { emailAddressId }: { emailAddressId: string } = emailFirstFactor as any

      await signIn.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId,
      })

      setProgress('OTP')
    } catch (error) {
      console.error(error)

      const isClerkError = 'errors' in error && Array.isArray(error.errors)

      if (!isClerkError) {
        form.setError('root', { message: 'An error occured' })
        return
      }

      form.setError('root', { message: error.errors[0].longMessage })
    } finally {
      setSendingOtp(false)
    }
  }

  const disabled = form.formState.isSubmitting || sendingOtp

  return (
    <Card className={cn('w-full h-fit min-h-[500px] mx-auto max-w-[400px] bg-background', className)}>
      <CardHeader>
        <CardTitle>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              {(() => {
                if (progress === 'INITIAL') {
                  return 'Masuk'
                }

                if (progress === 'OTP') {
                  return 'Masukkan OTP'
                }
              })()}
            </h1>
          </div>
        </CardTitle>
        <CardDescription className={cn('text-left')}>
          {(() => {
            if (progress === 'INITIAL') {
              return 'Untuk lanjut ke Supercuan Saham'
            }

            if (progress === 'OTP') {
              return `Masukkan kode OTP yang telah dikirimkan ke ${form.getValues('email')}`
            }
          })()}
        </CardDescription>
      </CardHeader>

      <CardContent className={cn('flex flex-col gap-8 my-10')}>
        {progress === 'INITIAL' && (
          <Button
            type='button'
            onClick={async () => {
              await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: redirectUrlParam ? `/sso-callback?redirect_url=${redirectUrlParam}` : '/sso-callback',
                redirectUrlComplete: redirectUrlParam ? `/check-user?redirect_url=${redirectUrlParam}` : '/check-user',
              })
            }}
          >
            <FcGoogle className='mr-2 h-5 w-5' />
            Sign in with Google
          </Button>
        )}

        {progress === 'INITIAL' && (
          <div className='relative flex items-center justify-center gap-x-4 py-2 text-xs uppercase'>
            <div className='bg-supercuan-primary h-px flex-1' />
            <span className='text-supercuan-primary bg-transparent'>Atau</span>
            <div className='bg-supercuan-primary h-px flex-1' />
          </div>
        )}

        <Form {...form}>
          <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
            {progress === 'INITIAL' && (
              <fieldset className='flex w-full flex-col gap-y-4' disabled={disabled}>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your email address...' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>
            )}

            {progress === 'OTP' && (
              <fieldset className='flex w-full flex-col gap-y-4' disabled={disabled}>
                <FormField
                  control={form.control}
                  name='otp'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One Time Passcode</FormLabel>
                      <FormControl>
                        <OTPInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>
            )}

            {progress === 'INITIAL' && (
              <Button
                type='button'
                size='sm'
                className={cn('select-none')}
                loading={disabled}
                disabled={disabled || form.getFieldState('email').invalid}
                onClick={onSendOtp}
              >
                Continue with email
              </Button>
            )}

            {progress === 'OTP' && (
              <Button type='submit' size='sm' className={cn('select-none mt-8')} loading={disabled} disabled={disabled}>
                Masuk
              </Button>
            )}

            {progress === 'INITIAL' && (
              <p className='text-xs'>
                Belum punya akun?{' '}
                <Link
                  href={parseUrl('web', '/sign-up', { utm_source: 'form-onsignin-web' })}
                  className='text-blue-500'
                  onClick={() => {
                    posthogCapture('register_button_clicked', { location: 'form-onsignin-web' })
                  }}
                >
                  Registrasi
                </Link>
              </p>
            )}

            {form.formState.errors.root ? (
              <p className='text-xs text-justify text-supercuan-error'>{form.formState.errors.root.message}</p>
            ) : null}
          </form>
        </Form>
      </CardContent>
      {progress === 'INITIAL' && (
        <CardFooter>
          <p className='text-xs text-justify select-none'>
            By clicking &quot;Continue with Google / Email&quot; above, you acknowledge that you have read and
            understood, and agree to Supercuan Saham&apos;s{' '}
            <Link
              href={parseUrl('marketing', '/terms-of-service')}
              className='hover:text-blue-500'
              prefetch
              target='_blank'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href={parseUrl('marketing', '/privacy-policy')}
              className='hover:text-blue-500'
              prefetch
              target='_blank'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      )}
    </Card>
  )
}
