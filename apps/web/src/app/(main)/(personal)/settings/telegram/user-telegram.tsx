'use client'

import type { Telegram } from '@repo/prisma/client'
import { formatDate } from '@repo/helper'
import cn from '@repo/tailwind-config/cn'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Separator,
  Button,
  CardFooter,
  Alert,
  AlertTitle,
  AlertDescription,
  toast,
} from '@repo/web-ui/components'
import { BatteryWarning } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { TELEGRAM_LINK } from '@repo/api'
import { disconnectTelegram } from './disconnect-telegram'

interface UserTelegramProps {
  telegram: Telegram
}

export function UserTelegram({ telegram }: UserTelegramProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    try {
      setLoading(true)
      await disconnectTelegram(telegram.id)
      location.reload()
      toast.success('Sukses menghapus koneksi akun Telegram!')
    } catch (error) {
      console.error(error)
      toast.error('Gagal menghapus koneksi akun Telegram!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={cn('bg-supercuan-secondary space-y-10 select-none')}>
      <CardHeader>
        <CardTitle>Kamu sudah tersambung ke Telegram</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='w-full h-fit flex items-center justify-center flex-col gap-8'>
          <p className='font-medium text-[#74777F] text-center'>Informasi Akun</p>

          <section className='grid gap-4'>
            <section className='grid grid-cols-2 gap-4'>
              <p className='font-semibold'>Akun</p>

              <section className='flex items-center justify-center gap-2'>
                <Avatar>
                  <AvatarImage src={telegram.photo_url ?? undefined} />
                  <AvatarFallback />
                </Avatar>

                <p>
                  {telegram.username ? `@${telegram.username}` : `${telegram.first_name} ${telegram.last_name ?? ''}`}
                </p>
              </section>
            </section>

            <section className='grid grid-cols-2 gap-4'>
              <p className='font-semibold'>Tanggal connect</p>

              <p>{formatDate(telegram.auth_date, 'long')}</p>
            </section>
          </section>

          <Separator />

          <section className='grid gap-4 text-center'>
            <p className='font-medium text-[#74777F]'>Channel Telegram Supercuan Saham</p>

            <Link href={TELEGRAM_LINK} target='_blank' className='text-blue-500 select-text'>
              {TELEGRAM_LINK}
            </Link>
          </section>

          <Button variant='destructive' type='button' disabled={loading} loading={loading} onClick={handleClick}>
            Disconnect Akun
          </Button>
        </div>
      </CardContent>

      <CardFooter>
        <Alert>
          <BatteryWarning className='h-4 w-4' />
          <AlertTitle>Note!</AlertTitle>
          <AlertDescription>
            Dengan kamu klik &apos;Disconnect Akun&apos; diatas, kamu hanya menghapus koneksi Telegram dengan database
            Supercuan Saham. Untuk menghapus seluruh koneksi, jangan lupa untuk menekan tombol &apos;Terminate
            Session&apos; di akun Telegram chat mu!{' '}
            <strong>
              Kamu akan otomatis keluar channel Telegram Supercuan Saham apabila menekan tombol &apos;Disconnect
              Akun&apos; diatas!
            </strong>
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  )
}
