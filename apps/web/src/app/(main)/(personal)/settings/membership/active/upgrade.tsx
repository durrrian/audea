'use client'

import type { Membership } from '@repo/prisma/client'
import { formatDate, parseUrl, rupiah } from '@repo/helper'
import cn from '@repo/tailwind-config/cn'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  toast,
} from '@repo/web-ui/components'
import { renderTier } from '@repo/web-ui/lib'
import { useRouter } from 'next/navigation'
import type { MembershipPrice } from '@repo/api'
import { useState } from 'react'
import { type CurrentProfile } from '@repo/clerk-action'
import { transactionToken } from '~/lib/transaction-token'

interface UpgradeProps {
  membership: Membership
  prices: MembershipPrice[]
  promoCode: string | null
  user: CurrentProfile
}

export function Upgrade({ membership, prices, promoCode, user }: UpgradeProps) {
  const router = useRouter()

  const selectedTierIndex = prices.findIndex((item) => item.tier === membership.tier)

  const availableTier = prices.slice(selectedTierIndex + 1)

  const currentPrice = prices[selectedTierIndex]

  const [loading, setLoading] = useState(new Array(availableTier.length).fill(false))

  if (membership.tier === 'PLATINUM') {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Upgrade membership</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className={cn('grid gap-10 select-none')}>
          <AlertDialogHeader>
            <AlertDialogTitle>Kamu tidak bisa upgrade membership</AlertDialogTitle>
            <AlertDialogDescription>
              Membership kamu sudah yang paling tinggi, yaitu {membership.tier}! Kamu hanya bisa perpanjang membership.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction>Mengerti</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upgrade membership</Button>
      </DialogTrigger>
      <DialogContent className={cn('grid gap-10 max-h-[100dvh] overflow-auto select-none')}>
        <DialogHeader>
          <DialogTitle>Yuk upgrade membership mu!</DialogTitle>
          <DialogDescription>
            Upgrade membership yang tersedia dibawah ini dan dapatkan keuntungannya!
          </DialogDescription>

          <p suppressHydrationWarning>
            Harga membership kamu sekarang <strong>{rupiah(currentPrice.price)}</strong> atau{' '}
            <strong>{rupiah(Math.floor(currentPrice.price / currentPrice.duration))}</strong> / bulan
          </p>
        </DialogHeader>

        {availableTier.map((v, i) => {
          return (
            <Card key={v.id} className={cn(renderTier(v.tier), 'text-supercuan-secondary shadow-md p-4 grid gap-3')}>
              <section className='grid gap-2'>
                <section className='flex items-center justify-between gap-x-4 gap-y-1 flex-wrap'>
                  <p className='font-semibold text-lg'>
                    {v.tier[0]}
                    {v.tier.slice(1, v.tier.length).toLowerCase()}
                  </p>
                  <p>{v.duration} months</p>
                </section>

                <p className='text-2xl font-medium'>{rupiah(v.price)}</p>

                <p className='flex items-center gap-x-2 gap-y-1 flex-wrap' suppressHydrationWarning>
                  {rupiah(Math.floor(v.ppm))} / bulan{' '}
                  {v.discount ? (
                    <span className='bg-supercuan-secondary text-supercuan-primary text-sm px-2 py-0.5 rounded-2xl text-center w-fit h-fit'>
                      {Math.ceil(v.discount)}% off
                    </span>
                  ) : null}
                </p>
              </section>

              <p className='text-xs'>
                Membership baru kamu akan berakhir pada{' '}
                {(() => {
                  const now = new Date(membership.endDate)
                  now.setMonth(now.getMonth() + v.duration)

                  return formatDate(now, 'long', true)
                })()}
              </p>

              <Button
                className={cn('bg-supercuan-secondary text-supercuan-primary hover:bg-supercuan-secondary/80')}
                onClick={async () => {
                  try {
                    setLoading(loading.map((_, j) => j === i))
                    const { token } = await transactionToken(v, promoCode, user)

                    const url = parseUrl('web', '/settings/membership/active')

                    if (promoCode) url.searchParams.set('promo_code', promoCode)

                    url.searchParams.set('token', token)

                    router.replace(url.href)
                  } catch (error) {
                    console.error(error)
                    toast.error('Gagal panggil payment processor')
                    throw error
                  } finally {
                    setLoading(new Array(availableTier.length).fill(false))
                  }
                }}
                loading={loading[i]}
                disabled={loading.includes(true)}
              >
                Upgrade ke {v.tier}
              </Button>
            </Card>
          )
        })}
      </DialogContent>
    </Dialog>
  )
}
