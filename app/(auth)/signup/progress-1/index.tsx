import { Button, Input, Label, LoadingSpinner } from '@/components'
import cn from '@/utils/cn'
import { useSignUp } from '@clerk/nextjs'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { checkUser } from './check-user'

interface Props {
  handleNext: (email: string) => void
}

export function Progress1({ handleNext }: Props) {
  const { signUp } = useSignUp()

  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')

  return (
    <motion.section
      className='mx-auto flex max-w-[400px] flex-col gap-6 px-4 pb-10 sm:gap-12 sm:px-0'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
        <p className='text-muted-foreground text-sm'>Enter your email below to create your account</p>
      </div>

      <section className='flex flex-col gap-8'>
        <form
          className='flex flex-col gap-3'
          onSubmit={async (e) => {
            e.preventDefault()

            setLoading(true)

            const formData = new FormData(e.currentTarget)
            const emailForm = formData.get('email')

            if (!emailForm) return

            try {
              const user = await checkUser(emailForm.toString())

              const isEmailExist = user !== null && user !== undefined

              if (isEmailExist) {
                setErrorMsg('Email is already registered, please login!')
                setLoading(false)
                return
              }

              // Email does not exist

              handleNext(emailForm.toString())

              setLoading(false)
            } catch (error) {
              setErrorMsg("We could not reach Audea's server. Please try again in a few minutes.")

              console.error(error)
            } finally {
              setLoading(false)
              return
            }
          }}
        >
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              placeholder='Enter your email address...'
              type='email'
              name='email'
              required={true}
              id='email'
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }}
            />
          </div>

          <Button disabled={loading} type='submit'>
            {loading && <LoadingSpinner className='mr-2' />}
            Continue with email
          </Button>
        </form>

        {errorMsg && <p className='text-destructive-foreground text-justify text-xs'>{errorMsg}</p>}

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>Or</span>
          </div>
        </div>

        <section className='flex flex-col gap-3'>
          <Button
            className={cn('h-fit min-w-full')}
            onClick={() => {
              signUp?.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/login/sso-callback',
                redirectUrlComplete: '/login/check-user',
              })
            }}
          >
            <FontAwesomeIcon icon={faGoogle} className='mr-2 h-4 w-4' />
            Sign in with Google
          </Button>
        </section>

        <p className='select-none text-justify text-xs'>
          By clicking &quot;Continue with Google / Email&quot; above, you acknowledge that you have read and understood,
          and agree to Audea&apos;s{' '}
          <a href={'/terms-of-service'} className='hover:text-blue-500' target='_blank' rel='noreferrer'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='/privacy-policy' className='hover:text-blue-500' target='_blank' rel='noreferrer'>
            Privacy Policy
          </a>
          .
        </p>
      </section>
    </motion.section>
  )
}
