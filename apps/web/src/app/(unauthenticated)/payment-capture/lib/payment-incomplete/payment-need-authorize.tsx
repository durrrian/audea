import cn from '@repo/tailwind-config/cn'
import { Card, CardHeader, CardTitle, CardContent } from '@repo/web-ui/components'
import { ShieldAlert } from 'lucide-react'
import type { Props } from './props'
import { AlertChangePayment } from './alert-change-payment'

export function PaymentNeedAuthorize({ cancelUrl }: Omit<Props, 'data'>) {
  return (
    <main className='mt-10 mb-20 md:px-2 px-4 overflow-x-hidden'>
      <Card className={cn('w-fit h-fit mx-auto max-w-[500px]')}>
        <CardHeader className='space-y-4'>
          <div className='w-full h-fit flex items-center justify-center'>
            <ShieldAlert className='w-20 h-20' />
          </div>
          <CardTitle>Transaksi kamu butuh di Autorisasi</CardTitle>
        </CardHeader>

        <CardContent className='space-y-6 text-justify'>
          <p>
            Tolong selesaikan transaksi kamu dengan mengotorisasi pembayaran melalui bank kamu. Dengan mengotorisasi
            transaksi ini, kamu akan dapat menyelesaikan pembelian membership Supercuan Saham kamu.
          </p>

          <p>Bingung? Jangan khawatir, tetap di halaman ini, dan ikuti instruksi bank kamu.</p>

          <AlertChangePayment cancelUrl={cancelUrl} />
        </CardContent>
      </Card>
    </main>
  )
}
