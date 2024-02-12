import { motion } from 'framer-motion'
import { useState } from 'react'
import cn from '@/utils/cn'
import { Button, Input, Label } from '@/components'

interface Props {
  handleNext: (firstName: string, lastName: string) => void
}

export function Progress3({ handleNext }: Props) {
  const [firstName, setFirstName] = useState('Ada')
  const [lastName, setLastName] = useState('Lovelace')

  const [loading, setLoading] = useState(false)

  return (
    <motion.section
      className='mx-auto flex max-w-[400px] flex-col gap-6 px-4 pb-10 sm:px-0'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='flex flex-col space-y-2 text-center'>
        <h2 className='text-2xl font-semibold tracking-tight'>What should we call you?</h2>
        <p className='text-muted-foreground text-sm'>Please insert you first and last name.</p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault()

          const formData = new FormData(e.currentTarget)
          const firstNameForm = formData.get('first-name')
          const lastNameForm = formData.get('last-name')

          if (!firstNameForm || !lastNameForm) return

          const firstName = firstNameForm.toString()
          const lastName = lastNameForm.toString()

          setLoading(true)
          handleNext(firstName, lastName)
          setLoading(false)
          return
        }}
        className='flex flex-col gap-6'
      >
        <div className='flex flex-col gap-2'>
          <Label htmlFor='first-name'>First name</Label>

          <Input
            placeholder='Ada'
            id='first-name'
            type='text'
            name='first-name'
            required={true}
            maxLength={50}
            onKeyUp={(e) => {
              const name = e.currentTarget.value

              setFirstName(name)
            }}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor='last-name'>Last name</Label>

          <Input
            placeholder='Lovelace'
            id='last-name'
            type='text'
            name='last-name'
            required={true}
            maxLength={50}
            onKeyUp={(e) => {
              const name = e.currentTarget.value

              setLastName(name)
            }}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
        </div>

        <section className='flex items-start justify-start gap-2'>
          <div className='h-fit w-fit'>
            <input type='checkbox' name='agree' id='agree' required={true} />
          </div>
          <Label htmlFor='agree' className={cn('text-left leading-5')}>
            I, {firstName} {lastName}, hereby agree to Audea&apos;s{' '}
            <a href='/terms-of-service' className='hover:text-blue-500' target='_blank' rel='noreferrer'>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href='/privacy-policy' className='hover:text-blue-500' target='_blank' rel='noreferrer'>
              Privacy Policy
            </a>
            .
          </Label>
        </section>

        <Button type='submit' disabled={!firstName || !lastName || loading}>
          Create your account
        </Button>
      </form>
    </motion.section>
  )
}
