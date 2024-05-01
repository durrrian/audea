'use client'

import type { Membership, Prices } from '@repo/prisma/client'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  toast,
} from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { TierPill } from '@repo/web-ui/lib'
import { formatDate, parseUrl, rupiah } from '@repo/helper'
import { useState } from 'react'
import type { CurrentProfile } from '@repo/clerk-action'
import { membershipMetadata } from '~/lib/membership-metadata'
import { transactionToken } from '~/lib/transaction-token'

interface PerpanjangProps {
  membership: Membership
  price: Prices
  promoCode: string | null
  user: CurrentProfile
}

export function Perpanjang({ membership, price, promoCode, user }: PerpanjangProps) {
  const { isLessThan7Days } = membershipMetadata(membership)

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' disabled={!isLessThan7Days}>
          Perpanjang membership
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={cn('grid gap-10')}>
        <AlertDialogHeader>
          <AlertDialogTitle>Perpanjang membership?</AlertDialogTitle>
          <AlertDialogDescription>
            Membership kamu akan habis pada {formatDate(new Date(membership.endDate), 'long', true)}, yuk perpanjang
            sekarang!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <section className='grid gap-4'>
          <section className='flex items-center justify-between gap-x-4 flex-wrap gap-y-1'>
            <p className='text-lg font-medium'>Tipe membership:</p>
            <TierPill tier={membership.tier} />
          </section>

          <section className='flex items-center justify-between gap-x-4 flex-wrap gap-y-1'>
            <p className='text-lg font-medium'>Harga:</p>

            <p className='text-lg font-semibold' suppressHydrationWarning>
              {rupiah(price.price)}
            </p>
          </section>

          <section className='flex items-center justify-between gap-x-4 flex-wrap gap-y-1'>
            <p className='text-lg font-medium'>Membership baru:</p>

            <p className='text-lg font-semibold'>
              {(() => {
                const now = new Date(membership.endDate)
                now.setUTCMonth(now.getUTCMonth() + price.duration)

                return formatDate(now, 'long', true)
              })()}
            </p>
          </section>
        </section>

        <AlertDialogFooter>
          <AlertDialogCancel className={cn('bg-background')}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={async () => {
                try {
                  setLoading(true)
                  const { token } = await transactionToken(price, promoCode, user)

                  const url = parseUrl('web', '/settings/membership/active')

                  if (promoCode) url.searchParams.set('promo_code', promoCode)

                  url.searchParams.set('token', token)

                  router.replace(url.href)
                } catch (error) {
                  console.error(error)
                  toast.error('Gagal panggil payment processor')
                  throw error
                } finally {
                  setLoading(false)
                }
              }}
              loading={loading}
            >
              Perpanjang
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>

        <p className='text-sm text-left text-muted-foreground'>
          Note: kalo kamu ingin downgrade tier membership kamu, itu hanya bisa dilakukan setelah membership sudah
          expired yaa!
        </p>
      </AlertDialogContent>
    </AlertDialog>
  )
}
