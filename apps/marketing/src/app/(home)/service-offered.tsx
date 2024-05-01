'use client'

import Image from 'next/image'
import Frame1 from '@repo/assets/marketing/service-offered/frame_1.png'
import Frame1Mobile from '@repo/assets/marketing/service-offered/frame_1_mobile.png'
import Frame2 from '@repo/assets/marketing/service-offered/frame_2.png'
import Frame3 from '@repo/assets/marketing/service-offered/frame_3.png'
import { motion } from 'framer-motion'
import cn from '@repo/tailwind-config/cn'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { posthogCapture } from '@repo/api'
import { useWindowSize } from '@repo/web-ui/hooks'
import { parseUrl } from '@repo/helper'
import Logo from '@repo/assets/logo/square_logo.svg'
import { HeadingWithLogo } from '~/ui/heading-with-logo'

function SquareLogo({ size }: { size: number }) {
  return <Image src={Logo} alt='Supercuan Logo' width={size} height={size} draggable={false} className='select-none' />
}

export function ServiceOffered() {
  const { width } = useWindowSize()

  const { isSignedIn } = useAuth()

  const isMobile = width && width < 768

  return (
    <section
      className='max-w-[1400px] mx-auto flex flex-col items-center justify-center px-2 scroll-mt-10'
      id='service'
    >
      <section className='w-fit h-fit md:space-y-20 space-y-14'>
        {/* Header */}
        <section className='font-bold text-center space-y-4'>
          <HeadingWithLogo>Service</HeadingWithLogo>
          <h4 className='lg:text-5xl md:text-4xl text-3xl text-black'>
            Semua yang kamu butuhin untuk cuan konsisten jangka panjang di market
          </h4>
        </section>

        {/* The content starts here */}
        <section className='space-y-10'>
          {/* First section is here */}
          <Link
            href={isSignedIn ? '/' : parseUrl('web', '/sign-up', { utm_source: 'service-offered-marketing' })}
            target={isSignedIn ? '_self' : '_blank'}
            onClick={() => {
              posthogCapture('register_button_clicked', { location: 'service-offered-marketing' })
            }}
          >
            <motion.section
              className={cn(
                'bg-supercuan-whitePrimary md:p-8 p-6 md:shadow-[18px_14px_4px_0_rgba(0,0,0,0.25)] shadow-[12px_12px_4px_0_rgba(0,0,0,0.25)] border border-supercuan-primary rounded-3xl flex flex-col items-center justify-center gap-12',
                isSignedIn ? 'cursor-auto' : 'cursor-pointer',
              )}
              whileHover={{ scale: isSignedIn ? 1 : 1.025 }}
            >
              {isMobile ? (
                <Image src={Frame1Mobile} alt='Supercuan porto sharing' draggable={false} quality={100} />
              ) : (
                <Image src={Frame1} alt='Supercuan porto sharing' draggable={false} quality={100} />
              )}

              <section className='flex md:flex-row flex-col md:items-center items-start justify-between gap-4 w-full'>
                <section className='font-medium max-w-[600px] space-y-4'>
                  <p className='flex items-center justify-center w-fit h-fit gap-1 md:text-lg text-base'>
                    <SquareLogo size={isMobile ? 18 : 20} /> Stock Portfolio
                  </p>
                  <h5 className='md:text-3xl text-2xl'>Supercuan Porto Sharing</h5>
                </section>

                <p className='font-normal md:text-xl text-lg text-left md:max-w-sm w-full'>
                  Portofolio akan dibagikan secara jelas & transparan sampai ke jumlah lot. Transaksi juga minim dengan
                  pendekatan pada value investing (1-3 transaksi perminggu).
                </p>
              </section>
            </motion.section>
          </Link>

          {/* Second and third section starts here */}
          <section className='grid md:grid-cols-2 grid-cols-1 gap-10'>
            {/* Second section is here */}
            <section className='bg-supercuan-whitePrimary md:p-8 p-6 md:shadow-[18px_14px_4px_0_rgba(0,0,0,0.25)] shadow-[12px_12px_4px_0_rgba(0,0,0,0.25)] border border-supercuan-primary rounded-3xl flex flex-col items-center justify-center gap-12'>
              <Image src={Frame2} alt='Konsultasi 1 on 1' draggable={false} quality={100} />

              <section className='flex flex-col items-start justify-center gap-4 w-full'>
                <p className='flex items-center justify-center w-fit h-fit gap-1 md:text-lg text-base font-medium'>
                  <SquareLogo size={isMobile ? 18 : 20} /> Konsultasi 1 on 1
                </p>
                <h5 className='md:text-3xl text-2xl font-medium'>Special Services (Additional Cost)</h5>

                <p className='font-normal md:text-xl text-lg text-left w-full'>
                  Buat kamu yang sibuk kerja, dan mau terima jadi. Kami ada special service dimana pengaturan porto akan
                  lebih personalised, melalui grup WA personal dengan saya dan free monthly zoom call.
                </p>
              </section>
            </section>

            {/* Third section is here */}
            <section className='bg-supercuan-whitePrimary md:p-8 p-6 md:shadow-[18px_14px_4px_0_rgba(0,0,0,0.25)] shadow-[12px_12px_4px_0_rgba(0,0,0,0.25)] border border-supercuan-primary rounded-3xl flex flex-col items-center justify-center gap-12'>
              <Image src={Frame3} alt='Online Courses' draggable={false} quality={100} />

              <section className='flex flex-col items-start justify-center gap-4 w-full'>
                <p className='flex items-center justify-center w-fit h-fit gap-1 md:text-lg text-base font-medium'>
                  <SquareLogo size={isMobile ? 18 : 20} /> Online Learning
                </p>
                <h5 className='md:text-3xl text-2xl font-medium'>Online Courses</h5>

                <p className='font-normal md:text-xl text-lg text-left w-full'>
                  Video pembelajaran online yang berisi materi dasar fundamental & technical analysis, portfolio
                  management, dan investing psychology. Beserta pembahasan baru mengenai suatu topik tiap bulannya.
                </p>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  )
}
