'use client'

import cn from '@/utils/cn'
import type { SignInFirstFactor } from '@clerk/types'
import { Edit, FileLock2, Key } from 'lucide-react'
import { MouseEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { CardContent, Button, Badge } from '@/components'

interface Props {
  email: string
  firstFactors: SignInFirstFactor[]
  handleEditEmail: MouseEventHandler<HTMLButtonElement>
  handleEmailCode: MouseEventHandler<HTMLButtonElement>
  handlePassword: MouseEventHandler<HTMLButtonElement>
  handleGoogle: MouseEventHandler<HTMLButtonElement>
}

export function ChooseFirstFactor({
  email,
  firstFactors,
  handleEditEmail,
  handleEmailCode,
  handlePassword,
  handleGoogle,
}: Props) {
  return (
    <CardContent className={cn('mt-4 flex flex-col gap-8')}>
      <Badge variant='outline' className={cn('h-fit w-fit px-4 py-1.5 text-sm')}>
        {email}
        <button onClick={handleEditEmail} type='button'>
          <Edit className='ml-4 h-4 w-4' />
        </button>
      </Badge>

      <div className='mt-10 flex flex-col gap-4'>
        {firstFactors.map(({ strategy }, index) => {
          if (strategy === 'email_code') {
            return (
              <Button className={cn('h-fit min-w-full')} key={index} onClick={handleEmailCode}>
                <Key className='mr-2 h-4 w-4' />
                Sign in with a one-time email code
              </Button>
            )
          }

          if (strategy === 'password') {
            return (
              <Button className={cn('h-fit min-w-full')} key={index} onClick={handlePassword}>
                <FileLock2 className='mr-2 h-4 w-4' />
                Sign in with your password
              </Button>
            )
          }

          if (strategy === 'oauth_google') {
            return (
              <Button className={cn('h-fit min-w-full')} key={index} onClick={handleGoogle}>
                <FontAwesomeIcon icon={faGoogle} className='mr-2 h-4 w-4' />
                Sign in with Google
              </Button>
            )
          }
        })}
      </div>
    </CardContent>
  )
}
