'use client'

import { Eye, EyeOff } from 'lucide-react'
import { Button } from './button'
import { Input, InputProps } from './input'
import { forwardRef, useState } from 'react'
import cn from '@repo/tailwind-config/cn'

const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input type={showPassword ? 'text' : 'password'} className={cn('pr-10', className)} ref={ref} {...props} />

      <Button
        variant='link'
        type='button'
        className='absolute right-0 top-0 flex h-full items-center justify-center pr-3'
        aria-label={showPassword ? 'Mask password' : 'Reveal password'}
        onClick={() => setShowPassword((show) => !show)}
      >
        {showPassword ? (
          <EyeOff aria-hidden className='text-muted-foreground h-5 w-5' />
        ) : (
          <Eye aria-hidden className='text-muted-foreground h-5 w-5' />
        )}
      </Button>
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
