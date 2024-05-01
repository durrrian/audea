'use client'

import cn from '@repo/tailwind-config/cn'
import { motion } from 'framer-motion'

export function RegisterProgressBar({
  className,
  children,
  width,
}: {
  className?: string
  children: React.ReactNode
  width: `${number}%`
}) {
  return (
    <div className={cn(className)}>
      {children}

      <div className='bg-foreground/40 relative mt-4 h-1.5 rounded-full'>
        <motion.div
          layout='size'
          layoutId='document-flow-container-step'
          className='absolute inset-y-0 left-0 rounded-full bg-blue-500'
          style={{
            width,
          }}
        />
      </div>
    </div>
  )
}
