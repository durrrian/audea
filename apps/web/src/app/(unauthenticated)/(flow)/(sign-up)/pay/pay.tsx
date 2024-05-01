'use client'

import { useRouter } from 'next/navigation'
import { Button, Separator } from '@repo/web-ui/components'
import type { Prices } from '@repo/prisma/client'
import { posthogCapture, type PromoData } from '@repo/api'
import { renderTier } from '@repo/web-ui/lib'
import cn from '@repo/tailwind-config/cn'
import { parseUrl, rupiah } from '@repo/helper'
import { RegisterProgressBar } from '~/ui/register-progress-bar'
import { PaymentDialog } from '~/ui/payment-dialog'

interface PayProps {
  promoData: PromoData
  price: Prices
  promoCode: string | null
  token: string
}

export function Pay({ promoData, price, promoCode, token }: PayProps) {
  const router = useRouter()

  return (
    <div className='border-border relative z-10 flex min-h-[min(800px,80dvh)] w-full max-w-lg flex-col rounded-xl border bg-background p-6'>
      <div className='space-y-2 mb-4'>
        <div className='h-fit'>
          <h1 className='text-2xl font-semibold'>Review paket & Bayar</h1>
          <p className='text-muted-foreground mt-2 text-sm'>Yuk diselesaikan pembayaran mu agar langsung cuan!</p>
        </div>
        <Separator />
      </div>

      <div className='flex flex-col items-center w-full justify-between h-full'>
        <div className='flex flex-col gap-y-4 w-full'>
          <div className='flex flex-col gap-y-2'>
            <div
              className={cn(
                renderTier(price.tier),
                'text-supercuan-secondary shadow-md p-4 w-full h-fit rounded-lg',
                'flex items-center justify-center flex-col gap-y-2',
              )}
            >
              <div className='flex items-center justify-between gap-x-4 w-full'>
                <p className='font-semibold text-lg'>
                  {price.tier[0]}
                  {price.tier.slice(1, price.tier.length).toLowerCase()}
                </p>

                <p>{price.duration} bulan</p>
              </div>
              <div className='w-full flex flex-col items-start justify-center gap-y-1'>
                <div className='w-fit h-fit relative'>
                  <p className={cn('font-medium', promoData.isPromoValid ? 'text-lg' : 'text-2xl')}>
                    {rupiah(price.price)}
                  </p>

                  {promoData.isPromoValid ? (
                    <div className='absolute inset-0 bg-red-500 w-full h-[2px] transform -rotate-6 top-1/2' />
                  ) : null}
                </div>

                {promoData.isPromoValid ? (
                  <div className='w-full flex items-center justify-start gap-x-2 flex-nowrap'>
                    <p className='font-medium text-2xl'>{rupiah(promoData.price.price)}</p>
                    <p className='whitespace-nowrap w-fit h-fit bg-supercuan-secondary text-supercuan-primary px-2 text-xs py-0.5 rounded-md'>
                      HARGA PROMO
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
            <Button
              variant='link'
              className='w-fit mx-auto'
              onClick={() => {
                const url = parseUrl('web', '/pick-membership')

                if (promoCode) url.searchParams.set('promo_code', promoCode)

                router.push(url.href)
              }}
            >
              Ganti paket
            </Button>
          </div>

          {(() => {
            if (promoData.message && promoCode && promoData.isPromoValid) {
              const arr = promoData.message.split(promoCode)
              return (
                <p className='text-green-700 text-xs'>
                  {arr[0]}
                  <span className='font-mono bg-gray-200 px-2 py-0.5 rounded-md whitespace-nowrap'>{promoCode}</span>
                  {arr[1]}
                </p>
              )
            }
            if (promoData.message) {
              return (
                <p className={cn(promoData.isPromoValid ? 'text-green-700' : 'text-red-700', 'text-xs')}>
                  {promoData.message}
                </p>
              )
            }
          })()}
        </div>

        <div className='w-full flex flex-col gap-y-8'>
          <PaymentDialog
            token={token}
            onClick={() => {
              posthogCapture('user_click_pay')
            }}
          >
            Bayar sekarang
          </PaymentDialog>

          <RegisterProgressBar width='100%'>
            <p className='text-muted-foreground text-sm'>
              <span className='font-medium'>Pembayaran</span> 4/4
            </p>
          </RegisterProgressBar>
        </div>
      </div>
    </div>
  )
}
