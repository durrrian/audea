'use client'

import { parseUrl } from '@repo/helper'
import cn from '@repo/tailwind-config/cn'
import type { ButtonProps } from '@repo/web-ui/components'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, Button } from '@repo/web-ui/components'
import { LoadingAnimation } from '@repo/web-ui/lib'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface WindowSnap {
  snap?: {
    embed: (token: string, options: SnapOptions) => void
  }
}

interface SnapOptions {
  embedId: string
  onSuccess: (result: Record<string, string>) => void
  onPending: (result: Record<string, string>) => void
  onError: (result: Record<string, string>) => void
  onClose: () => void
}

interface PaymentDialogProps extends Omit<ButtonProps, 'loading' | 'onError' | 'className' | 'children'> {
  token: string
  children?: React.ReactNode
  className?: string
  open?: boolean
  onClose?: SnapOptions['onClose']
  onOpenChange?: (open: boolean) => void
}

export function PaymentDialog({
  token,
  children,
  className,
  open,
  onOpenChange,
  onClose,
  ...props
}: PaymentDialogProps) {
  const [loadingEmbed, setLoadingEmbed] = useState(false)

  const snapContainerRef = useRef<HTMLDivElement | null>(null)

  const router = useRouter()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingEmbed(true)

      const windowSnap: Window & typeof globalThis & WindowSnap = window

      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain -- more robust
      if (windowSnap.snap && windowSnap.snap.embed && snapContainerRef.current) {
        clearInterval(intervalId)

        windowSnap.snap.embed(token, {
          embedId: 'snap-container',

          onSuccess: (result) => {
            const url = parseUrl('web', '/payment-capture')

            url.searchParams.set('order_id', result.order_id)

            if (result.transaction_status) url.searchParams.set('transaction_status', result.transaction_status)

            setLoadingEmbed(true)

            router.push(url.href)
          },

          onPending: (result) => {
            const url = parseUrl('web', '/payment-capture')

            url.searchParams.set('order_id', result.order_id)

            if (result.transaction_status) url.searchParams.set('transaction_status', result.transaction_status)

            setLoadingEmbed(true)

            router.push(url.href)
          },

          onError: (result) => {
            const url = parseUrl('web', '/payment-capture/error')

            if (result.order_id) url.searchParams.set('order_id', result.order_id)

            if (result.transaction_status) url.searchParams.set('transaction_status', result.transaction_status)

            setLoadingEmbed(true)

            router.push(url.href)
          },

          onClose: () => {
            if (onClose) {
              onClose()
            }
          },
        })

        setLoadingEmbed(false)
      }
    }, 1000) // Check every second

    return () => {
      clearInterval(intervalId)
    } // Clean up on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need to re-run this effect
  }, [])

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children ? (
        <AlertDialogTrigger asChild>
          <Button className={cn('w-full', className)} {...props}>
            {children}
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent className='p-0 overflow-hidden'>
        <div id='snap-container' className='w-full h-full' ref={snapContainerRef} />

        {loadingEmbed ? (
          <div className='w-full flex items-center justify-center'>
            <LoadingAnimation />
          </div>
        ) : null}
      </AlertDialogContent>
    </AlertDialog>
  )
}
