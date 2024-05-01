'use client'

import { useEffect, useRef } from 'react'
import { ShieldQuestion } from 'lucide-react'
import cn from '@repo/tailwind-config/cn'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@repo/web-ui/components'
import Link from 'next/link'
import { parseUrl } from '@repo/helper'

export function Connect() {
  const telegramWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ref = telegramWrapperRef.current

    // Create the Telegram Login Widget script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://telegram.org/js/telegram-widget.js?22`
    script.setAttribute('data-telegram-login', 'supercuan_saham_bot')
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-radius', '10')
    script.setAttribute('data-auth-url', parseUrl('web', '/settings/telegram/verify').href) // Replace with your backend authentication endpoint
    script.setAttribute('data-request-access', 'write')

    ref?.appendChild(script)

    return () => {
      ref?.removeChild(script)
    }
  }, [])

  return (
    <Card className={cn('bg-supercuan-secondary space-y-10 select-none')}>
      <CardHeader>
        <CardTitle>Sambungkan Akun Telegram Kamu</CardTitle>
      </CardHeader>

      <CardContent>
        <div ref={telegramWrapperRef} className='w-fit mx-auto h-fit' />
      </CardContent>

      <CardFooter>
        <Alert>
          <ShieldQuestion className='h-4 w-4' />
          <AlertTitle>Apa yang kamu dapat dengan menyambungkan akun Telegram?</AlertTitle>
          <AlertDescription>
            <ol className='list-inside ml-4 list-decimal'>
              <li>
                Sebelum menyambungkan akun Telegram, ada baiknya kamu harus punya Telegram username terlebih dahulu.
                Gampang banget kok caranya. Kamu bisa baca lengkapnya{' '}
                <Link
                  href='https://www.wikihow.com/Know-Chat-ID-on-Telegram-on-Android'
                  target='_blank'
                  className='underline'
                >
                  disini
                </Link>
              </li>
              <li>
                Kamu akan bisa chat dengan Telegram Bot terkait informasi portfolio, membership, metrics, dan transaksi
                Supercuan Saham
              </li>
              <li>Kamu akan mendapat link komunitas Telegram Supercuan Saham</li>
            </ol>
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  )
}
