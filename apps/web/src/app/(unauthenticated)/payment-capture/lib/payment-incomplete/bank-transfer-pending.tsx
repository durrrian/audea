'use client'

import cn from '@repo/tailwind-config/cn'
import { Card, CardHeader, CardTitle, CardContent, Input, Label, Button } from '@repo/web-ui/components'
import { BadgeCheck, ShieldAlert, Clipboard } from 'lucide-react'
import { useState } from 'react'
import type { Props } from './props'
import { AlertChangePayment } from './alert-change-payment'

export function BankTransferPending({ data, cancelUrl }: Props) {
  const [successCopy, setSuccessCopy] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- safe
  const bank = data.va_numbers ? data.va_numbers[0].bank.toUpperCase() : 'yang kamu pilih'
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- safe
  const bankNumber: string = data.va_numbers ? data.va_numbers[0].va_number : 'tertera di midtrans'

  return (
    <main className='mt-10 mb-20 md:px-2 px-4 overflow-x-hidden'>
      <Card className={cn('w-fit h-fit mx-auto max-w-[500px]')}>
        <CardHeader className='space-y-4'>
          <div className='w-full h-fit flex items-center justify-center'>
            <ShieldAlert className='w-20 h-20' />
          </div>
          <CardTitle>Transaksi kamu butuh di selesaikan</CardTitle>
        </CardHeader>

        <CardContent className='space-y-8 text-justify'>
          <section className='space-y-2'>
            <p>
              Tolong selesaikan transaksi kamu dengan melakukan pembayaran via <strong>bank {bank}</strong> di nomor
              rekening / virtual account:
            </p>

            <div className='flex items-center space-x-2 text-xl'>
              <div className='grid flex-1 gap-2'>
                <Label htmlFor='bankNumber' className='sr-only'>
                  Nomor rekening / virtual account
                </Label>
                <Input id='bankNumber' defaultValue={bankNumber} readOnly className={cn('h-9 text-lg')} />
              </div>

              <Button
                variant='outline'
                size='sm'
                onClick={async () => {
                  await navigator.clipboard.writeText(bankNumber)
                  setSuccessCopy(true)

                  setTimeout(() => {
                    setSuccessCopy(false)
                  }, 3000)
                }}
                disabled={successCopy}
              >
                {successCopy ? (
                  <BadgeCheck className='mr-2 h-4 w-4 text-green-500' />
                ) : (
                  <Clipboard className='mr-2 h-4 w-4' />
                )}
                Copy
              </Button>
            </div>
          </section>

          <AlertChangePayment cancelUrl={cancelUrl} />
        </CardContent>
      </Card>
    </main>
  )
}
