'use client'

import { formatDate } from '@repo/helper'
import type { Membership, User } from '@repo/prisma/client'
import { MailOpen } from 'lucide-react'
import { LoadingAnimation, TierPill } from '@repo/web-ui/lib'
import { RedirectButton } from '@repo/web-ui/components'
import { useRunStatuses } from '@trigger.dev/react'
import { useQuery } from '@tanstack/react-query'
import { posthogCapture } from '@repo/api'
import { Failed, Loading, Success } from '~/ui/animation'

interface Prop {
  deferId: string
  user: User
}

export function Progress({ deferId, user }: Prop) {
  const { fetchStatus, error, statuses, run } = useRunStatuses(deferId)

  useQuery({
    queryKey: [`posthog-capture`, deferId],
    queryFn: () => {
      posthogCapture('user-finish-payment')
    },
  })

  if (fetchStatus === 'loading') {
    return (
      <main className='w-fit h-fit max-w-[1100px] mx-auto md:px-2 px-4 flex flex-col items-center justify-center gap-10 overflow-x-hidden mb-20 mt-4 select-none'>
        <section className='flex flex-col items-center justify-center gap-2 text-center'>
          <LoadingAnimation />
        </section>
      </main>
    )
  }

  if (fetchStatus === 'error' || run.status === 'FAILURE') {
    return (
      <main className='w-fit h-fit max-w-[1100px] mx-auto md:px-2 px-4 flex flex-col items-center justify-center gap-10 overflow-x-hidden mb-20 mt-4 select-none'>
        <section className='flex flex-col items-center justify-center gap-2 text-center'>
          <Failed />

          <p>Ada error yang terjadi! Tenang aja, pembayaran mu gak akan hilang, tunggu email kami yaa!</p>

          {error ? (
            <div className='w-full text-center text-sm flex flex-col gap-y-2'>
              <p>{error.name}</p>
              <p>{error.message}</p>
            </div>
          ) : null}
        </section>
      </main>
    )
  }

  if (run.output) {
    return (
      <main className='w-fit h-fit max-w-[1100px] mx-auto md:px-2 px-4 flex flex-col items-center justify-center gap-10 overflow-x-hidden mb-20 mt-4 select-none'>
        <section className='flex flex-col items-center justify-center gap-2 text-center'>
          <Success />

          <h1 className='sm:text-4xl text-2xl font-medium'>
            {(() => {
              const runOutput = run.output as Record<string, string>

              if (runOutput.type === 'look-whos-back') {
                return `Welcome back ${user.name} 🔥`
              }

              if (runOutput.type === 'new-member') {
                return `Pembayaran berhasil 🔥`
              }

              if (runOutput.type === 'perpanjang') {
                return `Perpanjang membership berhasil 🔥`
              }

              if (runOutput.type === 'upgrading') {
                return `Upgrade membership berhasil 🔥`
              }
            })()}
          </h1>

          <p className='sm:text-2xl text-xl font-normal'>
            {(() => {
              const runOutput = run.output as Record<string, string>

              if (runOutput.type === 'look-whos-back') {
                return `Pembelian kembali membership sudah berhasil`
              }

              if (runOutput.type === 'new-member') {
                return `Welcome to Supercuan Saham community!`
              }

              if (runOutput.type === 'perpanjang') {
                return `Waktu membership kamu sudah otomatis berubah`
              }

              if (runOutput.type === 'upgrading') {
                return `Tipe & waktu membership kamu sudah otomatis berubah`
              }
            })()}
          </p>
        </section>

        {(() => {
          const runOutput = run.output as { type: string; newMembership: Membership; oldMembership?: Membership }

          if (runOutput.type === 'new-member') {
            return (
              <section className='flex items-start justify-center gap-2 bg-supercuan-greyPrimary text-[#74777F] w-fit h-fit p-4 rounded-lg'>
                <div className='min-w-5 min-h-5'>
                  <MailOpen className='w-5 h-5' />
                </div>
                <p>
                  Bukti pembayaran beserta detail membership sudah dikirimkan melalui email{' '}
                  <strong>{user.email}</strong>!
                </p>
              </section>
            )
          }

          return (
            <section className='w-full h-fit flex flex-col gap-4'>
              <div className='w-full h-fit flex flex-col gap-2'>
                <section className='w-full flex items-center justify-between gap-x-4'>
                  <p>Tipe membership kamu sekarang</p>
                  <TierPill tier={runOutput.newMembership.tier} className='w-fit' />
                </section>

                {runOutput.oldMembership ? (
                  <section className='w-full flex items-center justify-between gap-x-4 opacity-30'>
                    <p>Tipe membership kamu sebelumnya</p>
                    <TierPill tier={runOutput.oldMembership.tier} className='w-fit' />
                  </section>
                ) : null}
              </div>

              <section className='w-full flex items-center justify-between gap-x-4'>
                <p>Membership kamu akan berakhir di</p>
                <p>{formatDate(new Date(runOutput.newMembership.endDate), 'long')}</p>
              </section>
            </section>
          )
        })()}

        <div className='flex w-full items-center justify-center'>
          <RedirectButton
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- mager
            redirectUrl={run.output.type === 'new-member' ? '/' : '/settings/membership'}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- mager
            text={run.output.type === 'new-member' ? 'Masuk ke aplikasi' : 'Kembali ke laman membership'}
            countdown={15}
          />
        </div>
      </main>
    )
  }

  return (
    <main className='w-fit h-fit max-w-[1100px] mx-auto md:px-2 px-4 flex flex-col items-center justify-center gap-10 overflow-x-hidden mb-20 mt-4 select-none'>
      <section className='flex flex-col items-center justify-center gap-2 text-center'>
        <Loading />

        {statuses.map((status) => (
          <p key={status.key}>{status.label}</p>
        ))}
      </section>
    </main>
  )
}
