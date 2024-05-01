'use client'

import cn from '@repo/tailwind-config/cn'
import { OTPInput as OTPInputComponent } from 'input-otp'

export type OTPInputProps = Omit<
  React.ComponentProps<typeof OTPInputComponent>,
  'maxLength' | 'containerClassName' | 'render' | 'children'
> & {
  className?: string
}

export function OTPInput({ className, ...props }: OTPInputProps) {
  return (
    <OTPInputComponent
      {...props}
      maxLength={6}
      containerClassName='group flex items-center has-[:disabled]:opacity-30 w-full'
      render={({ slots }) => {
        const slotClassName = (isActive: boolean) =>
          cn(
            'relative w-full h-16 text-[2rem]',
            'flex items-center justify-center',
            'transition-all duration-300',
            'border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md',
            'group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20',
            'outline outline-0 outline-accent-foreground/20',
            { 'outline-4 outline-accent-foreground': isActive },
            'bg-background',
            className,
          )

        return (
          <>
            <div className='flex w-full'>
              {slots.slice(0, 3).map((slot, i) => (
                <div key={i} className={slotClassName(slot.isActive)}>
                  {slot.char !== null && <div>{slot.char}</div>}
                </div>
              ))}
            </div>

            <div className='flex w-10 justify-center items-center'>
              <div className='w-3 h-1 rounded-full bg-border' />
            </div>

            <div className='flex w-full'>
              {slots.slice(3).map((slot, i) => (
                <div key={i} className={slotClassName(slot.isActive)}>
                  {slot.char !== null && <div>{slot.char}</div>}
                </div>
              ))}
            </div>
          </>
        )
      }}
    />
  )
}
