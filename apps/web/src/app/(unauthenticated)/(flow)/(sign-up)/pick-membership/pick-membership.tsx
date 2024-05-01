'use client'

import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle, Separator } from '@repo/web-ui/components'
import type { Prices } from '@repo/prisma/client'
import { renderTier } from '@repo/web-ui/lib'
import cn from '@repo/tailwind-config/cn'
import { parseUrl, rupiah } from '@repo/helper'
import { motion } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'
import { posthogCapture } from '@repo/api'
import { RegisterProgressBar } from '~/ui/register-progress-bar'

interface PickMembershipProps {
  promoCode: string | undefined
  prices: Prices[]
}

export function PickMembership({ promoCode, prices }: PickMembershipProps) {
  const router = useRouter()

  return (
    <div className='border-border relative z-10 flex min-h-[min(800px,80dvh)] w-full max-w-lg flex-col rounded-xl border bg-background p-6'>
      <div className='space-y-2 mb-4'>
        <div className='h-fit'>
          <h1 className='text-2xl font-semibold'>Pilih paket member</h1>
          <p className='text-muted-foreground mt-2 text-sm'>Yuk pilih paket member yang sesuai dengan kebutuhan kamu</p>
        </div>
        <Separator />
      </div>

      <div className='flex flex-col gap-y-8'>
        <section className='flex flex-col gap-y-4'>
          {prices.map((v) => {
            return (
              <motion.button
                key={v.tier}
                className={cn(
                  renderTier(v.tier),
                  'text-supercuan-secondary shadow-md p-4 w-full h-fit rounded-lg',
                  'flex items-center justify-center flex-col gap-y-2',
                )}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.975 }}
                onClick={() => {
                  posthogCapture(`user_pick_${v.tier}`)

                  const url = parseUrl('web', '/pay')

                  url.searchParams.set('tier', v.tier)

                  if (promoCode) url.searchParams.set('promo_code', promoCode)

                  router.push(url.href)
                }}
              >
                <div className='flex items-center justify-between gap-x-4 w-full'>
                  <p className='font-semibold text-lg'>
                    {v.tier[0]}
                    {v.tier.slice(1, v.tier.length).toLowerCase()}
                  </p>
                  <p>{v.duration} bulan</p>
                </div>
                <div className='w-full flex flex-col items-start justify-center gap-y-1'>
                  <p className='text-2xl font-medium'>{rupiah(v.price)}</p>
                  <p className='text-sm'>hanya {rupiah(Math.floor(v.price / v.duration))} per bulan</p>
                </div>
              </motion.button>
            )
          })}
        </section>

        <RegisterProgressBar width='75%'>
          <p className='text-muted-foreground text-sm'>
            <span className='font-medium'>Pilih paket membership</span> 3/4
          </p>
        </RegisterProgressBar>

        {promoCode ? (
          <Alert>
            <ShieldAlert className='h-4 w-4' />
            <AlertTitle>Kamu ada kode promo nih!</AlertTitle>
            <AlertDescription>Tenang aja, harga promo akan dikalkulasi di halaman selanjutnya!</AlertDescription>
          </Alert>
        ) : null}
      </div>
    </div>
  )
}
