'use client'

import { Terminal, XCircle } from 'lucide-react'
import Link from 'next/link'
import cn from '@repo/tailwind-config/cn'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Alert,
  AlertTitle,
  AlertDescription,
  CardFooter,
  Button,
} from '@repo/web-ui/components'
import type { Props } from './props'

export function FailedPayment({ data, cancelUrl }: Props) {
  return (
    <main className='mt-10 mb-20 md:px-2 px-4 overflow-x-hidden'>
      <Card className={cn('w-fit h-fit mx-auto max-w-[500px]')}>
        <CardHeader className='space-y-4'>
          <div className='w-full h-fit flex items-center justify-center'>
            <XCircle className='w-24 h-24 text-supercuan-error' />
          </div>
          <CardTitle>Transaksi kamu gagal</CardTitle>
        </CardHeader>

        <CardContent className='space-y-6 text-justify'>
          <p>Maaf, transaksi kamu tidak berhasil.</p>

          <section className='space-y-4'>
            <p>Ada beberapa faktor yang mungkin menyebabkan kegagalan transaksi ini, di antaranya:</p>

            <ol className='list-decimal list-inside space-y-2 text-left'>
              <li>
                <strong>Saldo Tidak Cukup</strong>: Pastikan saldo kamu mencukupi untuk melakukan pembayaran.
              </li>

              <li>
                <strong>Penolakan oleh Bank</strong>: Pastikan kamu telah memasukkan informasi kartu dengan benar dan
                tidak ada masalah dengan kartu kamu.
              </li>

              <li>
                <strong>Transaksi sudah expired</strong>: Pastikan kamu membayar sebelum waktu transaksi habis.
              </li>
            </ol>
          </section>

          <p>Kami mohon maaf atas ketidaknyamanan yang mungkin kamu alami.</p>

          <Alert>
            <Terminal className='h-4 w-4' />
            <AlertTitle>Saldo kamu tetap kepotong?</AlertTitle>
            <AlertDescription>
              <p className='text-left'>
                Apabila transaksi sudah terjadi namun kamu melihat halaman ini, silahkan email saya di{' '}
                <Link href='mailto:supercuansaham.id' className='underline'>
                  alvin@supercuansaham.id
                </Link>{' '}
                dengan mencantumkan order id <strong>{data.order_id}</strong>.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter>
          <Link className='w-full h-fit' href={cancelUrl}>
            <Button className='w-full'>Kembali ke laman pembayaran</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
