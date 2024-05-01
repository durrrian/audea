'use client'

import { Button, Separator, toast } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { X } from 'lucide-react'

interface ContentBlockerToastProps {
  t: string | number
}

export function ContentBlockerToast({ t }: ContentBlockerToastProps) {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-4 p-4 rounded-xl'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <p>
          <X className='mr-2 w-4 h-4 text-destructive' />
          Kesalahan terjadi saat memuat skrip untuk fitur chat.
        </p>
        <Separator />
      </div>

      <p className='text-justify'>
        Kemungkinan besar ini disebabkan oleh{' '}
        <strong>
          <em>content blocker</em>
        </strong>{' '}
        karena kamu terdeteksi menggunakan browser <strong>Safari</strong>. Kamu dapat mencoba lagi menggunakan browser
        yang berbeda, atau, kamu bisa coba klik tutorial tentang cara mematikan content blocker{' '}
        <a
          href='https://nordvpn.com/blog/how-to-turn-off-ad-blocker'
          target='_blank'
          className='underline text-supercuan-primary'
          rel='noopener'
        >
          disini
        </a>
        .
      </p>

      <Button onClick={() => toast.dismiss(t)} size='default' variant='destructive' className={cn('w-full')}>
        Dismiss
      </Button>
    </div>
  )
}
