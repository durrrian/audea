'use client'

import { motion } from 'framer-motion'
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import type { CummulativeStockData } from '@repo/api'
import { posthogCapture } from '@repo/api'
import { useWindowSize } from '@repo/web-ui/hooks'
import { parseUrl } from '@repo/helper'
import { HeroChart } from '@repo/web-ui/lib'
import Parallax from './parallax'
import { getRandomSubset } from './get-random-subset'
import emiten from './emiten'

interface HeroProps {
  cummulativeStockData: CummulativeStockData
}

export function Hero({ cummulativeStockData }: HeroProps) {
  const { width } = useWindowSize()

  const isMobile = Boolean(width && width < 900)

  const firstSetOfLogoFull = useMemo(() => getRandomSubset(emiten, 10), [])
  const secondSetOfLogoFull = useMemo(() => getRandomSubset(emiten, 10), [])

  const firstSetOfLogoMobile = useMemo(() => getRandomSubset(emiten, 5), [])
  const secondSetOfLogoMobile = useMemo(() => getRandomSubset(emiten, 5), [])

  const firstSetOfLogo = isMobile ? firstSetOfLogoMobile : firstSetOfLogoFull
  const secondSetOfLogo = isMobile ? secondSetOfLogoMobile : secondSetOfLogoFull

  const { isSignedIn } = useAuth()

  return (
    <section className='relative space-y-24 pt-10 max-w-[100dvw] overflow-x-hidden'>
      <section className='space-y-20'>
        <Parallax baseVelocity={5}>
          {firstSetOfLogo.map(({ logo, name }) => {
            return (
              <div
                key={name}
                className='sm:p-2 p-1 border border-supercuan-primary rounded-lg bg-supercuan-whitePrimary h-fit w-fit'
              >
                <Image src={logo} alt={`Logo ${name}`} key={name} draggable={false} height={30} quality={100} />
              </div>
            )
          })}
        </Parallax>

        <section className='flex flex-col items-center justify-center gap-8 max-w-[1100px] mx-auto px-2'>
          <section className='space-y-4 text-center'>
            <h1 className='md:text-6xl text-3xl font-bold'>Your gateway of beating the market</h1>
            <h2 className='md:text-2xl  font-medium'>
              Stop ngorbanin waktu untuk analisa beribu emiten saham. Cukup jadi member Supercuan Saham dan dapatkan
              akses ke portfolio saya untuk cuan konsistent jangka panjang.
            </h2>
          </section>

          <section className='space-y-1'>
            <Link
              href={isSignedIn ? '/' : parseUrl('web', '/sign-up', { utm_source: 'hero-marketing' })}
              target={isSignedIn ? '_self' : '_blank'}
            >
              <motion.button
                className='px-4 py-2.5 rounded-xl text-xl shadow-xl bg-gradient-to-r from-supercuan-primary to-[#C33764] text-supercuan-secondary font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'
                whileHover={{ scale: isSignedIn ? 1 : 1.1 }}
                type='button'
                disabled={isSignedIn}
                tabIndex={-1}
                onClick={() => {
                  posthogCapture('register_button_clicked', { location: 'hero-marketing' })
                }}
              >
                Gabung membership <ChevronRightIcon />
              </motion.button>
            </Link>

            <p className='text-sm text-center select-none'>
              {isSignedIn ? 'Kamu sudah login!' : 'Cukup 1 menit untuk jadi member!'}
            </p>
          </section>
        </section>

        <Parallax baseVelocity={-5}>
          {secondSetOfLogo.map(({ logo, name }) => {
            return (
              <div
                key={name}
                className='sm:p-2 p-1 border border-supercuan-primary rounded-lg bg-supercuan-whitePrimary h-fit w-fit'
              >
                <Image src={logo} alt={`Logo ${name}`} draggable={false} key={name} height={30} quality={100} />
              </div>
            )
          })}
        </Parallax>
      </section>

      <div className='px-2'>
        <HeroChart initialData={cummulativeStockData} className='shadow-xl border border-supercuan-primary' />
      </div>
    </section>
  )
}
