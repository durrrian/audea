'use client'

import Image from 'next/image'
import Divider from '@repo/assets/marketing/bio/divider.svg'
import Alvin from '@repo/assets/marketing/bio/alvin_tanasta.png'
import SupercuanLogo from '@repo/assets/marketing/bio/supercuan_gray_square.svg'
import { FaInstagram, FaTiktok } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useWindowSize } from '@repo/web-ui/hooks'
import { ALVIN_INSTAGRAM_LINK, ALVIN_TIKTOK_LINK } from '@repo/helper'

export function Bio() {
  const [hoverLink, setHoverLink] = useState<number | null>(null)

  const { width } = useWindowSize()

  const credentials = ['Rocket Internet', 'Bukalapak', 'Shopee']

  const socmed = [
    {
      id: 1,
      name: 'Instagram',
      Icon: FaInstagram,
      link: ALVIN_INSTAGRAM_LINK,
    },

    {
      id: 2,
      name: 'TikTok',
      Icon: FaTiktok,
      link: ALVIN_TIKTOK_LINK,
    },
  ]

  return (
    <section className='relative'>
      {/* Divider */}
      <div className='min-w-full'>
        <Image src={Divider} alt='' draggable={false} quality={100} width={5000} />
      </div>

      {/* Main content */}
      <section className='space-y-10 max-w-[1000px] 2xl:mx-28 md:mx-10 mx-0 w-fit px-2 scroll-mt-10' id='about'>
        {/* Alvin's picture */}
        <div className='md:h-[350px] h-[250px] relative w-fit'>
          <div className='md:w-[350px] md:h-[350px] w-[250px] h-[250px] rounded-full overflow-hidden flex items-start justify-center border-2 border-supercuan-primary'>
            <Image
              src={Alvin}
              alt='Alvin Tanasta'
              draggable={false}
              quality={100}
              width={width && width < 768 ? 400 : 500}
              height={width && width < 768 ? 400 : 500}
            />
          </div>

          <p className='absolute bottom-0 md:text-[40px] text-[30px] w-full text-center rounded-md font-medium text-supercuan-secondary bg-supercuan-primary'>
            Halo, saya Alvin
          </p>
        </div>

        {/* Biography section */}
        <section className='flex flex-col items-start justify-center w-fit h-fit gap-8 font-normal md:text-3xl text-xl text-left'>
          <p>
            Lahir di tahun 1995, Alvin adalah seorang lulusan teknik dari University of Illinois (UIUC) yang merupakan
            sekolah teknik di dunia nomor 15.
          </p>

          <p>
            Pertama kali tertarik di dunia finance saat proyek kuliah senior menganalisa <b>economic feasibility</b>{' '}
            dari Dry Grind Ethanol Plan. Hingga saat ini, Alvin telah bekerja di 3 perusahaan unicorn:
          </p>

          <ul>
            {credentials.map((v) => {
              return (
                <li
                  key={v}
                  className='list-none flex items-start gap-2 md:gap-4 pt-3 md:pt-6 md:text-3xl text-xl font-semibold'
                >
                  <Image
                    src={SupercuanLogo}
                    alt=''
                    quality={100}
                    draggable={false}
                    width={28}
                    height={28}
                    className='select-none'
                  />
                  {v}
                </li>
              )
            })}
          </ul>
          <p>
            Telah berinvestasi dari 2018 dan secara konsisten mendapatkan return di atas market. Kini, Alvin memutuskan
            untuk mendirikan Supercuan Saham untuk membantu para investor saham untuk melakukan hal yang sama.
          </p>
        </section>

        {/* Socmed section */}
        <div className='w-fit h-fit flex items-center gap-12 pt-6 flex-wrap'>
          {socmed.map(({ Icon, ...v }) => {
            return (
              <motion.a
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                href={v.link}
                className='flex items-center justify-center gap-2'
                target='_blank'
                key={v.id}
                onMouseEnter={() => {
                  setHoverLink(v.id)
                }}
                onMouseLeave={() => {
                  setHoverLink(null)
                }}
                onFocus={() => {
                  setHoverLink(v.id)
                }}
              >
                <span className='w-9 h-9 flex items-center justify-center rounded-full bg-supercuan-primary aspect-square'>
                  <Icon className='text-supercuan-secondary' />
                </span>

                <span>
                  <span className='flex items-center justify-start font-semibold md:text-2xl text-xl'>
                    {v.name} <ExternalLink className='w-4 h-4 ml-2' />
                  </span>
                  {hoverLink === v.id ? (
                    <motion.div
                      className='bg-supercuan-primary'
                      initial={{ width: '0%', height: 0 }}
                      animate={{ width: '100%', height: 2 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className='bg-supercuan-secondary h-[2px] w-full' />
                  )}
                </span>
              </motion.a>
            )
          })}
        </div>
      </section>

      {/* Rotating logo */}
      <motion.div
        className='w-fit h-fit absolute md:right-20 right-5 lg:top-80 md:top-40 top-10 z-[-1] select-none'
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        <Image
          src={SupercuanLogo}
          draggable={false}
          quality={100}
          alt=''
          width={width && width < 768 ? 300 : 500}
          height={width && width < 768 ? 300 : 500}
        />
      </motion.div>

      <div className='w-fit h-fit absolute bottom-[-20rem] right-80 2xl:block hidden select-none'>
        <svg width='571' height='870' viewBox='0 0 571 870' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M23.7816 869.489L46.8787 829.491L0.690663 829.487L23.7816 869.489ZM365.216 617.786C365.206 615.577 363.407 613.795 361.198 613.805C358.989 613.815 357.206 615.615 357.217 617.824L365.216 617.786ZM547.351 6.54956C548.663 4.77264 548.287 2.26811 546.51 0.955527C544.733 -0.357058 542.228 0.0193542 540.916 1.79627L547.351 6.54956ZM556.326 131.556L553 133.778L556.326 131.556ZM27.7671 833.853C32.3454 784.802 56.4322 747.34 92.8281 725.961C129.286 704.546 178.549 699.017 233.795 714.864L236.001 707.174C179.1 690.852 127.494 696.321 88.7763 719.063C49.9967 741.842 24.6007 781.695 19.8017 833.109L27.7671 833.853ZM365.216 617.786C365.156 604.856 374.815 594.14 391.789 584.253C408.601 574.461 431.164 566.313 454.222 558.001C477.06 549.768 500.393 541.372 517.967 531.136C535.379 520.995 548.596 508.2 548.514 490.653L540.514 490.69C540.575 503.62 530.915 514.337 513.941 524.223C497.129 534.015 474.566 542.164 451.509 550.475C428.67 558.708 405.337 567.104 387.763 577.34C370.351 587.482 357.134 600.276 357.217 617.824L365.216 617.786ZM548.514 490.653C548.478 483.049 546.16 475.265 542.645 467.392C539.127 459.51 534.291 451.288 528.996 442.789C518.312 425.643 505.724 407.281 496.733 386.854C487.791 366.54 482.587 344.536 486.606 320.42C490.625 296.304 503.949 269.586 532.959 240.007L527.247 234.406C497.403 264.835 483.069 292.978 478.715 319.105C474.361 345.231 480.068 368.853 489.411 390.077C498.703 411.187 511.772 430.274 522.206 447.02C527.47 455.468 532.058 463.302 535.34 470.653C538.626 478.014 540.485 484.641 540.514 490.69L548.514 490.653ZM559.651 129.333C549.176 113.659 538.143 104.319 528.837 97.5137C526.527 95.8245 524.321 94.2904 522.29 92.8762C520.243 91.451 518.391 90.1608 516.711 88.9103C513.311 86.3807 510.935 84.2438 509.422 82.0153C508.001 79.9246 507.26 77.6361 507.413 74.5539C507.572 71.327 508.72 67.0957 511.434 61.274C516.88 49.5897 528.056 32.6699 547.351 6.54956L540.916 1.79627C521.657 27.8681 510.013 45.3855 504.183 57.8942C501.258 64.169 499.653 69.4733 499.422 74.1597C499.184 78.9909 500.415 82.9936 502.804 86.5108C505.1 89.8902 508.373 92.6779 511.935 95.3286C513.735 96.6681 515.694 98.032 517.719 99.442C519.761 100.863 521.891 102.346 524.115 103.971C532.943 110.427 543.207 119.125 553 133.778L559.651 129.333ZM532.959 240.007C547.539 225.141 560.175 206.677 566.234 187.375C572.318 167.994 571.815 147.533 559.651 129.333L553 133.778C563.493 149.479 564.155 167.288 558.601 184.979C553.022 202.75 541.218 220.161 527.247 234.406L532.959 240.007ZM233.795 714.864C274.13 726.434 307.277 724.073 330.384 707.225C353.531 690.347 365.414 659.807 365.216 617.786L357.217 617.824C357.408 658.538 345.897 686.012 325.67 700.76C305.403 715.538 275.196 718.417 236.001 707.174L233.795 714.864Z'
            fill='url(#paint0_linear_547_4470)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_547_4470'
              x1='19.6169'
              y1='869.986'
              x2='662.838'
              y2='93.3613'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#1F365F' />
              <stop offset='0.390625' stopColor='#1F365F' stopOpacity='0.567708' />
              <stop offset='1' stopColor='#1F365F' stopOpacity='0' />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}
