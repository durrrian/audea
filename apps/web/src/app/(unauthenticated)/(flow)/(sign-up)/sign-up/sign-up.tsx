/* eslint-disable @typescript-eslint/no-unsafe-member-access -- for error */

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Badge,
  Button,
  Form as FormComponent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  OTPInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { useSignUp } from '@clerk/nextjs'
import { posthogCapture } from '@repo/api'
import type { MembershipTier } from '@repo/prisma/client'
import { parseUrl } from '@repo/helper'
import { ZEmail, ZName, ZOtp, ZPhoneNumber } from '~/lib/form-schema'
import { RegisterProgressBar } from '~/ui/register-progress-bar'
import { LoadingForm } from './loading-form'
import { register } from './register'

const marketingValue = [
  'Google',
  'Tau dari member Supercuan Saham yang lain',
  'Instagram',
  'TikTok',
  'Instagram / Facebook Ads',
]

type STEP = 'SIGN_UP' | 'OTP'

const FormSchema = z.object({
  name: ZName,
  email: ZEmail,
  otp: ZOtp,
  whatsapp: ZPhoneNumber,
  knowFrom: z.string().optional(),
})

interface SignUpProps {
  initialEmail: string | undefined
  initialMessage: string | undefined
  tier: MembershipTier | undefined
  promoCode: string | undefined
}

export function SignUp({ initialEmail, initialMessage, tier, promoCode }: SignUpProps) {
  const router = useRouter()

  const [step, setStep] = useState<STEP>('SIGN_UP')

  const [loading, setLoading] = useState(false)

  const { isLoaded, signUp, setActive } = useSignUp()

  const form = useForm<z.infer<typeof FormSchema>>({
    values: {
      name: '',
      email: initialEmail ?? '',
      otp: '',
      whatsapp: '',
      knowFrom: undefined,
    },
    mode: 'all',
    resolver: zodResolver(FormSchema),
  })

  const isSubmitting = form.formState.isSubmitting

  useEffect(() => {
    if (initialMessage) {
      form.setError('root', { message: initialMessage })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need
  }, [])

  if (!isLoaded) return <LoadingForm />

  const handleClickNext = async () => {
    setLoading(true)

    form.clearErrors()

    try {
      const nameArr = form.getValues('name').split(' ')

      const firstName = nameArr[0]

      const lastName = nameArr.length > 1 ? nameArr.slice(1).join(' ') : undefined

      await signUp.create({
        emailAddress: form.getValues('email'),
        firstName,
        lastName,
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      posthogCapture('user_complete_biodata')

      setStep('OTP')
    } catch (error) {
      console.error(error)

      const isClerkError = 'errors' in error && Array.isArray(error.errors)

      if (!isClerkError) {
        form.setError('root', { message: 'An error occured' })
        return
      }

      form.setError('root', { message: error.errors[0].longMessage })
    } finally {
      setLoading(false)
    }
  }

  const onFormSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.otp,
      })

      if (completeSignUp.status !== 'complete' || !signUp.createdUserId) {
        form.setError('root', { message: 'An error occurred, please try again!' })
        return
      }

      await register(
        {
          name: data.name,
          clerkUserId: signUp.createdUserId,
          email: data.email,
          whatsappNumber: `+62${data.whatsapp}`,
        },
        { knowOrigin: data.knowFrom ?? null },
      )

      await setActive({ session: signUp.createdSessionId })

      posthogCapture('user_verified_email')

      let url: URL

      if (tier) {
        url = parseUrl('web', `/pay?tier=${tier}`)
      } else {
        url = parseUrl('web', '/pick-membership')
      }

      if (promoCode) url.searchParams.set('promo_code', promoCode)

      router.push(url.href)
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

  return (
    <div className='border-border relative z-10 flex min-h-[min(800px,80dvh)] w-full max-w-lg flex-col rounded-xl border bg-background p-6'>
      <div className='space-y-2 mb-4'>
        <div className='h-fit'>
          <h1 className='text-2xl font-semibold'>Buat akun baru</h1>
          <p className='text-muted-foreground mt-2 text-sm'>
            Buat akun Supercuan Saham baru dan dapatkan cuan jangka panjang!
          </p>
        </div>
        <Separator />
      </div>

      <FormComponent {...form}>
        <form className='flex w-full flex-1 flex-col gap-y-4' onSubmit={form.handleSubmit(onFormSubmit)}>
          {step === 'SIGN_UP' && (
            <fieldset className={cn('flex w-full flex-col gap-y-4', 'h-fit max-h-full')} disabled={isSubmitting}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='whatsapp'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. WhatsApp</FormLabel>
                    <FormControl>
                      <div className='border-input ring-offset-background focus-within:ring-ring flex items-center justify-center overflow-hidden rounded-md border focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'>
                        <p className='flex h-10 items-center justify-center bg-gray-200 px-3 py-2 text-black text-sm'>
                          +62
                        </p>

                        <input
                          type='text'
                          className={cn(
                            'bg-background placeholder:text-muted-foreground flex h-10 w-full px-3 py-2 text-sm outline-none ring-0 focus:ring-0',
                          )}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className='text-muted-foreground mt-4 text-sm'>
                Sudah punya akun?{' '}
                <Link href='/sign-in' className='duration-200 hover:opacity-70'>
                  Masuk
                </Link>
              </p>
            </fieldset>
          )}

          {step === 'OTP' && (
            <fieldset className={cn('flex w-full flex-col gap-y-4', 'h-fit max-h-full')} disabled={isSubmitting}>
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

              <FormField
                control={form.control}
                name='knowFrom'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tau Supercuan Saham dari mana? <Badge>Optional</Badge>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Pilih salah satu' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {marketingValue.map((v) => {
                          return (
                            <SelectItem value={v} key={v}>
                              {v}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
          )}

          <RegisterProgressBar className='mt-6' width={step === 'SIGN_UP' ? '25%' : '50%'}>
            {step === 'SIGN_UP' && (
              <p className='text-muted-foreground text-sm'>
                <span className='font-medium'>Identitas diri</span> 1/4
              </p>
            )}

            {step === 'OTP' && (
              <p className='text-muted-foreground text-sm'>
                <span className='font-medium'>Verifikasi email</span> 2/4
              </p>
            )}
          </RegisterProgressBar>

          <div className='flex items-center gap-x-4'>
            {/* Continue button */}
            {step === 'SIGN_UP' && (
              <Button
                type='button'
                size='lg'
                className='flex-1 disabled:cursor-not-allowed'
                loading={loading}
                disabled={
                  loading ||
                  form.getFieldState('name').invalid ||
                  form.getFieldState('email').invalid ||
                  form.getFieldState('whatsapp').invalid ||
                  !form.getValues('name') ||
                  !form.getValues('email') ||
                  !form.getValues('whatsapp')
                }
                onClick={async () => handleClickNext()}
              >
                Lanjut
              </Button>
            )}

            {/* Sign up button */}
            {step === 'OTP' && (
              <Button
                loading={form.formState.isSubmitting}
                disabled={!form.formState.isValid}
                type='submit'
                size='lg'
                className='flex-1'
              >
                Lanjut
              </Button>
            )}
          </div>

          {form.formState.errors.root ? (
            <p className='text-sm text-destructive'>{form.formState.errors.root.message}</p>
          ) : null}
        </form>
      </FormComponent>
    </div>
  )
}
