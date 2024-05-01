import { ShieldAlert, X } from 'lucide-react'
import cn from '@repo/tailwind-config/cn'
import { Card, CardHeader, CardTitle, CardContent, LoadingSpinner } from '@repo/web-ui/components'
import { useEffect, useState } from 'react'
import { parseUrlMidtransApi } from '@repo/helper'
import type { Props } from './props'
import { AlertChangePayment } from './alert-change-payment'

export function QRPending({ data, cancelUrl }: Props) {
  const [imageSrc, setImageSrc] = useState<string>(parseUrlMidtransApi(`/v2/qris/${data.transaction_id}/qr-code`).href)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Load the image URL
    const img = new Image()

    img.onload = () => {
      // Image loaded successfully
      setImageSrc(img.src)
    }

    img.onerror = () => {
      // Image failed to load
      setError(true)
    }
  }, [])

  return (
    <main className='mt-10 mb-20 md:px-2 px-4'>
      <Card className={cn('w-fit h-fit mx-auto max-w-[500px]')}>
        <CardHeader className='space-y-4'>
          <div className='w-full h-fit flex items-center justify-center'>
            <ShieldAlert className='w-20 h-20' />
          </div>
          <CardTitle>Transaksi kamu butuh di selesaikan</CardTitle>
        </CardHeader>

        <CardContent className='space-y-8 text-justify'>
          <section className='flex flex-col items-center justify-center gap-2'>
            <p>
              Tolong selesaikan transaksi kamu dengan melakukan pembayaran via <strong>QRIS</strong>. Silahkan scan QR
              code dibawah ini:
            </p>

            <div className='w-full h-full max-h-[300px] max-w-[300px] aspect-square'>
              {(() => {
                if (error) {
                  // Render an error state if the image failed to load
                  return (
                    <div className='w-full h-full flex items-center justify-center bg-supercuan-greyPrimary text-supercuan-error text-center'>
                      <div className='flex items-center justify-center gap-2'>
                        <X className='w-4 h-4 mr-2' />
                        <p>Error loading QR Code</p>
                      </div>
                    </div>
                  )
                }

                if (imageSrc) {
                  // Render the image if it loaded successfully
                  // eslint-disable-next-line @next/next/no-img-element -- need use image
                  return <img src={imageSrc} alt='QR Code' className='w-full h-full' />
                }

                // Render a loading state if the image is still loading
                return (
                  <div className='w-full h-full flex items-center justify-center bg-supercuan-greyPrimary text-center'>
                    <div className='flex items-center justify-center gap-2'>
                      <LoadingSpinner />
                      <p>Loading...</p>
                    </div>
                  </div>
                )
              })()}
            </div>
          </section>

          <section className='space-y-2'>
            <p className='text-sm'>
              QR Code tidak muncul / error? Coba lagi selesaikan pembayaran via QR Code yang muncul sebelum laman ini.
            </p>

            <p className='text-sm'>
              Tidak simpan QR Code-nya? Silahkan cancel transaksi via link dibawah dan ulangi pembayaranmu.
            </p>
          </section>

          <AlertChangePayment cancelUrl={cancelUrl} />
        </CardContent>
      </Card>
    </main>
  )
}
