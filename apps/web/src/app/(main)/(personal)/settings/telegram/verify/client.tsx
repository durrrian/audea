'use client'

import cn from '@repo/tailwind-config/cn'
import { Button } from '@repo/web-ui/components'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Failed, Loading, Success } from '~/ui/animation'
import type { TelegramData } from './verify-telegram'
import { verifyTelegram } from './verify-telegram'

interface ClientProps {
  telegramData: TelegramData
}

export function Client({ telegramData }: ClientProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: [telegramData.telegram_id],
    queryFn: async () => verifyTelegram(telegramData),
  })

  const router = useRouter()

  useEffect(() => {
    if (data?.telegramUserId) {
      router.push('/settings/telegram')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need for extra
  }, [data])

  return (
    <section className='w-fit h-fit text-center'>
      <div className={cn('md:w-[400px] md:h-[400px]', 'w-[300px] h-[300px]')}>
        {(() => {
          if (isError) {
            return (
              <>
                <Failed />

                <p>
                  Gagal verifikasi akun Telegram kamu.{' '}
                  <Button
                    variant='link'
                    onClick={() => {
                      location.reload()
                    }}
                  >
                    Coba lagi
                  </Button>
                </p>
              </>
            )
          }

          if (isPending) {
            return (
              <>
                <Loading />

                <p>Lagi verifikasi akun Telegram kamu...</p>
              </>
            )
          }

          return (
            <>
              <Success />

              <p>Sukses connect Telegram kamu!</p>
            </>
          )
        })()}
      </div>
    </section>
  )
}
