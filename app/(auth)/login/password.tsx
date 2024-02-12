'use client'

import cn from '@/utils/cn'
import { FormEventHandler, MouseEventHandler } from 'react'
import { Edit } from 'lucide-react'
import { Badge, Button, CardContent, Input, Label, LoadingSpinner } from '@/components'

interface Props {
  email: string
  handleSubmit: FormEventHandler<HTMLFormElement>
  loading: boolean
  errorMsg: string | null
  handleEditEmail: MouseEventHandler<HTMLButtonElement>
  onForgotPassword: MouseEventHandler<HTMLButtonElement>
}

export default function Password({ email, handleSubmit, loading, errorMsg, handleEditEmail, onForgotPassword }: Props) {
  return (
    <CardContent className={cn('mt-4 flex flex-col gap-8')}>
      <Badge variant='outline' className={cn('h-fit w-fit px-4 py-1.5 text-sm')}>
        {email}
        <button onClick={handleEditEmail} type='button'>
          <Edit className='ml-4 h-4 w-4' />
        </button>
      </Badge>

      <div className='flex flex-col gap-1'>
        <p>Enter your password</p>
        <button className='h-fit w-fit text-xs text-blue-500' type='button' onClick={onForgotPassword}>
          Forgot password?
        </button>
      </div>

      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input placeholder='Enter your password...' type='password' name='password' required={true} id='password' />
        </div>

        <Button disabled={loading} type='submit'>
          {loading && <LoadingSpinner className='mr-2' />}
          Sign in
        </Button>

        {errorMsg && <p className='text-destructive-foreground text-justify text-xs'>{errorMsg}</p>}
      </form>

      <p className='text-background select-none' aria-hidden={true}>
        By clicking &quot;Continue with Google / Email&quot; above, you
      </p>
    </CardContent>
  )
}
