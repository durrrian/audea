'use client'

import cn from '@/utils/cn'
import { FormEventHandler, MouseEventHandler, useState } from 'react'
import OtpInput from 'react-otp-input'
import { Edit } from 'lucide-react'
import { Badge, Button, CardContent, Input, LoadingSpinner } from '@/components'

interface Props {
  email: string
  handleSubmit: FormEventHandler<HTMLFormElement>
  loading: boolean
  errorMsg: string | null
  handleEditEmail: MouseEventHandler<HTMLButtonElement>
}

export function EmailCode({ email, handleSubmit, loading, errorMsg, handleEditEmail }: Props) {
  const [otp, setOtp] = useState('')

  return (
    <CardContent className={cn('mt-4 flex flex-col gap-8')}>
      <Badge variant='outline' className={cn('h-fit w-fit px-4 py-1.5 text-sm')}>
        {email}
        <button onClick={handleEditEmail} type='button'>
          <Edit className='ml-4 h-4 w-4' />
        </button>
      </Badge>

      <p>
        We&apos;ve sent you a one-time code to <strong>{email}</strong>
      </p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <OtpInput
          placeholder='696969'
          value={otp}
          onChange={setOtp}
          numInputs={6}
          containerStyle={'w-full flex flex-row justify-between gap-1 mt-2 font-medium text-xl'}
          inputStyle={{
            width: '100%',
            maxWidth: '60px',
          }}
          renderInput={(props, index) => <Input {...props} className='text-xl' name={`otp-${index}`} required={true} />}
        />
        <Button disabled={loading} type='submit'>
          {loading && <LoadingSpinner className='mr-2' />}
          Verify code
        </Button>

        {errorMsg && <p className='text-destructive-foreground text-justify text-xs'>{errorMsg}</p>}
      </form>
    </CardContent>
  )
}
