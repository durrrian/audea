import { Alert, AlertTitle, AlertDescription } from '@repo/web-ui/components'
import { Terminal } from 'lucide-react'
import Link from 'next/link'
import type { Props } from './props'

export function AlertChangePayment({ cancelUrl }: { cancelUrl: Props['cancelUrl'] }) {
  return (
    <Alert>
      <Terminal className='h-4 w-4' />
      <AlertTitle>Ingin ganti metode pembayaran atau cancel?</AlertTitle>
      <AlertDescription>
        <p className='text-left'>
          Pastikan kamu <strong>tidak jadi membayar</strong> dan <strong>belum ada transaksi apa-apa</strong> melalui
          bank kamu yang mengatas-namakan Supercuan Saham. Silahkan{' '}
          <Link href={cancelUrl} className='underline text-blue-500'>
            klik disini
          </Link>{' '}
          untuk mengubah metode pembayaran atau cancel.
        </p>
      </AlertDescription>
    </Alert>
  )
}
