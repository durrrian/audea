'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import SupercuanLogo from '@repo/assets/logo/square_logo.svg'
import Image from 'next/image'
import { useAuth } from '@clerk/nextjs'
import { parseUrl, rupiah } from '@repo/helper'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Fireworks, RangeInput, TierPill } from '@repo/web-ui/lib'
import type { MembershipPrice } from '@repo/api'
import { membershipPrice, posthogCapture } from '@repo/api'
import { HeadingWithLogo } from '~/ui/heading-with-logo'

interface PickMembershipProps {
  prices: MembershipPrice[]
}

export function PickMembership({ prices }: PickMembershipProps) {
  const features = [
    "Full access to Alvin's stock portfolio",
    'Changes updated in real time',
    'Monthly Zoom meeting',
    'Unique stock analysis and insights',
  ]

  const { isSignedIn } = useAuth()

  const { data } = useQuery({
    queryKey: ['membership-price'],
    queryFn: async () => membershipPrice(),
    initialData: prices,
  })

  const [selectPrices, setSelectPrices] = useState(data[0])

  return (
    <div className='2xl:pt-60 pt-0'>
      <section className='max-w-[1400px] mx-auto px-2 space-y-10 scroll-mt-10' id='membership'>
        {/* Header */}
        <section className='font-bold text-center space-y-4'>
          <HeadingWithLogo>Pilihan Membership Supercuan Saham</HeadingWithLogo>
          <h4 className='lg:text-5xl md:text-4xl text-3xl text-black'>Gabung sekarang dan tumbuh bersama</h4>
        </section>

        {/* Main content */}
        <section
          className={`w-full h-fit bg-supercuan-whitePrimary flex flex-col items-center justify-center gap-0 border-2 rounded-xl border-supercuan-primary overflow-hidden ${
            isSignedIn ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-auto'
          }`}
        >
          <div className='text-center bg-supercuan-greyPrimary py-4 text-lg font-medium w-full h-fit border-b-2 border-supercuan-primary'>
            <p>4 Tipe Paket Membership</p>
          </div>

          {/* The content inside the main content */}
          <section className='w-full h-full flex flex-col items-center justify-center gap-20 md:p-10 sm:p-8 p-6 relative'>
            <section className='w-full h-fit md:space-y-10 space-y-16'>
              <section className='flex flex-col md:gap-4 gap-8 w-full h-fit items-center justify-center'>
                <TierPill tier={selectPrices.tier} />

                <section className='w-full h-fit flex md:flex-row flex-col gap-8 items-start justify-between'>
                  <section className='text-left space-y-2'>
                    <p className='font-normal text-xl'>Durasi membership</p>
                    <motion.p
                      key={selectPrices.duration}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.5 } }}
                      className='font-medium text-3xl'
                    >
                      {selectPrices.duration % 12 === 0
                        ? `${selectPrices.duration / 12} tahun`
                        : `${selectPrices.duration} bulan`}
                    </motion.p>
                  </section>

                  <section className='text-left space-y-2'>
                    <p className='font-normal text-xl'>Harga membership</p>

                    <section className='space-y-1'>
                      <motion.section
                        key={selectPrices.price}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.5 } }}
                        className='flex items-center gap-1'
                      >
                        <p className='font-medium text-3xl'>{rupiah(selectPrices.price)}</p>

                        {selectPrices.tier !== 'BRONZE' && selectPrices.discount ? (
                          <p className='bg-supercuan-primary text-supercuan-secondary text-sm px-2 py-0.5 rounded-2xl text-center'>
                            {Math.ceil(selectPrices.discount)}% off
                          </p>
                        ) : null}
                      </motion.section>

                      <motion.p
                        key={selectPrices.ppm}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.5 } }}
                        className='text-sm'
                      >
                        {selectPrices.tier !== 'BRONZE' && 'Hanya'}{' '}
                        <span className='font-medium'>{rupiah(Math.floor(selectPrices.ppm))} / bulan</span>
                      </motion.p>
                    </section>
                  </section>
                </section>
              </section>

              <section className='w-full h-fit md:space-y-8 space-y-4'>
                <p className='text-xs text-[#7B7B76] text-center'>Geser untuk melihat pilihan paket</p>

                <RangeInput
                  min={0}
                  max={prices.length - 1}
                  step={1}
                  handleChange={(e) => {
                    const index = Number(e.currentTarget.value)

                    setSelectPrices(prices[index])
                  }}
                  disabled={isSignedIn}
                />
              </section>
            </section>

            <section className='w-full h-fit space-y-10'>
              <div className='flex items-center sm:gap-10 gap-4'>
                <hr className='flex-grow border-black' />
                <span className='text-black text-lg'>Seluruh paket termasuk</span>
                <hr className='flex-grow border-black' />
              </div>

              <ul className='grid md:grid-cols-2 md:grid-rows-2 gap-x-10 gap-y-6 grid-cols-1 max-w-[900px] mx-auto'>
                {features.map((v) => {
                  return (
                    <li
                      key={v}
                      className='list-none flex items-center gap-2 text-xl leading-none font-medium w-fit h-fit'
                    >
                      <Image src={SupercuanLogo} alt='' quality={100} draggable={false} width={22} height={22} />
                      {v}
                    </li>
                  )
                })}
              </ul>
            </section>

            <Link
              href={
                isSignedIn
                  ? '/'
                  : parseUrl('web', '/sign-up', { utm_source: 'pick-membership-marketing', tier: selectPrices.tier })
              }
              target={isSignedIn ? '_self' : '_blank'}
              className='w-full h-fit z-10'
            >
              <motion.button
                className='w-full h-fit bg-supercuan-primary rounded-full py-3 text-center text-supercuan-secondary text-xl font-semibold shadow-lg disabled:cursor-not-allowed select-none'
                whileHover={{ scale: isSignedIn ? 1 : 1.025 }}
                type='button'
                disabled={isSignedIn}
                tabIndex={-1}
                onClick={() => {
                  posthogCapture('register_button_clicked', { location: 'pick-membership-marketing' })
                }}
              >
                Gabung membership
              </motion.button>
            </Link>

            {selectPrices.tier === 'PLATINUM' && <Fireworks />}
          </section>
        </section>
      </section>
    </div>
  )
}
