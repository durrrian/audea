'use client'

import { Button, CardContent, CardFooter, Input, Label, LoadingSpinner } from '@/components'
import cn from '@/utils/cn'
import { useSignIn } from '@clerk/nextjs'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FormEventHandler } from 'react'

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>
  loading: boolean
  errorMsg: string | null
  redirectUrl: string | undefined
}

export function FirstSequence({ onSubmit, loading, errorMsg, redirectUrl }: Props) {
  const { signIn } = useSignIn()

  return (
    <>
      <CardContent className={cn('my-10 flex flex-col gap-8')}>
        <Button
          className={cn('h-fit min-w-full')}
          onClick={() => {
            signIn?.authenticateWithRedirect({
              strategy: 'oauth_google',
              redirectUrl: redirectUrl ? `/login/sso-callback?redirect_url=${redirectUrl}` : '/login/sso-callback',
              redirectUrlComplete: redirectUrl ? `/login/check-user?redirect_url=${redirectUrl}` : '/login/check-user',
            })
          }}
        >
          <FontAwesomeIcon icon={faGoogle} className='mr-2 h-4 w-4' />
          Sign in with Google
        </Button>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>Or</span>
          </div>
        </div>

        <form className='flex flex-col gap-3' onSubmit={onSubmit}>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input placeholder='Enter your email address...' type='email' name='email' required={true} id='email' />
          </div>

          <Button disabled={loading} type='submit'>
            {loading && <LoadingSpinner className='mr-2' />}
            Continue with email
          </Button>

          {errorMsg && <p className='text-destructive text-justify text-xs'>{errorMsg}</p>}
        </form>
      </CardContent>
      <CardFooter>
        <p className='select-none text-justify text-xs'>
          By clicking &quot;Continue with Google / Email&quot; above, you acknowledge that you have read and understood,
          and agree to Audea&apos;s{' '}
          <Link href={'/terms-of-service'} prefetch className='hover:text-blue-500' target='_blank' rel='noreferrer'>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href={'/privacy-policy'} prefetch className='hover:text-blue-500' target='_blank' rel='noreferrer'>
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </>
  )
}
