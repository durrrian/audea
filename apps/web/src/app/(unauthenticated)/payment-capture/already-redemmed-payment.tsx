'use client'

import { motion } from 'framer-motion'
import { MailOpen } from 'lucide-react'
import Link from 'next/link'
import { RedirectButton } from '@repo/web-ui/components'
import { parseUrl } from '@repo/helper'
import { Success } from '~/ui/animation'

export function AlreadyRedemmedPayment() {
  return (
    <motion.main
      className='w-fit h-fit max-w-[1100px] mx-auto md:px-2 px-4 flex flex-col items-center justify-center gap-10 overflow-x-hidden mb-20 mt-4 select-none'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <section className='flex flex-col items-center justify-center gap-2 text-center'>
        <Success />

        <h1 className='sm:text-4xl text-2xl font-medium'>Pembayaran ini sudah berhasil 🔥</h1>

        <p className='sm:text-2xl text-xl font-normal'>
          Kamu sudah terdaftar sebagai member Supercuan Saham community!
        </p>
      </section>

      <section className='flex items-start justify-center gap-2 bg-supercuan-greyPrimary text-[#74777F] w-fit h-fit p-4 rounded-lg'>
        <div className='min-w-5 min-h-5'>
          <MailOpen className='w-5 h-5' />
        </div>
        <p>Bukti pembayaran beserta detail membership sudah dikirimkan melalui email kamu!</p>
      </section>

      <section className='flex flex-col items-center justify-center gap-y-4'>
        <Link href={parseUrl('marketing', '/').href} className='underline'>
          Kembali ke website
        </Link>
        <p className='text-center'>atau</p>
        <div className='flex w-full items-center justify-center'>
          <RedirectButton redirectUrl='/' text='Masuk ke aplikasi' countdown={15} />
        </div>
      </section>
    </motion.main>
  )
}
