'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import cn from '@repo/tailwind-config/cn'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
)

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
