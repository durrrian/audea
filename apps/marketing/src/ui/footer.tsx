'use client'

import { motion } from 'framer-motion'
import { ExternalLink, LogIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import cn from '@repo/tailwind-config/cn'
import { ALVIN_EMAIL, ALVIN_EMAIL_LINK, INSTAGRAM_LINK, WHATSAPP_LINK, WHATSAPP_NUMBER, parseUrl } from '@repo/helper'
import { posthogCapture } from '@repo/api'
import Logo from '@repo/assets/logo/logo_grey.svg'

export function Footer() {
  const { isSignedIn } = useAuth()

  const [hoverLink, setHoverLink] = useState<number | null>(null)

  const navigations = [
    {
      name: 'Sitemap',
      childs: [
        { id: 1, link: '/#service', text: 'Service' },
        { id: 2, link: '/#about', text: 'About' },
        { id: 3, link: '/#membership', text: 'Membership' },
        { id: 4, link: '/#testimonial', text: 'Testimonial' },
        { id: 5, link: '/#tools', text: 'Tools' },
      ],
    },

    {
      name: 'Links',
      childs: [
        { id: 6, link: '/article', text: 'Article' },
        { id: 7, link: '/faq', text: 'FAQ' },
        { id: 8, link: '/privacy-policy', text: 'Privacy Policy' },
        { id: 9, link: '/terms-of-service', text: 'Terms of Service' },
      ],
    },

    {
      name: 'Social',
      childs: [
        { id: 10, link: INSTAGRAM_LINK, text: 'Instagram' },
        { id: 11, link: WHATSAPP_LINK, text: 'WhatsApp' },
      ],
    },
  ]

  return (
    <div className='flex flex-col items-center justify-center w-full h-full md:gap-4 gap-14'>
      <footer
        className={cn(
          'min-h-full text-supercuan-secondary md:grid md:grid-rows-1 items-start justify-around gap-12 max-w-[1400px] w-full mx-auto px-2 select-none md:grid-cols-[0.5fr_1.5fr_0.5fr] flex flex-wrap-reverse',
        )}
      >
        <section className='flex flex-col items-start justify-center gap-6 max-w-[400px]'>
          <Link href='/' className='cursor-pointer'>
            <Image src={Logo} alt='Supercuan Saham Logo' draggable={false} width={225} height={225} />
          </Link>

          <section className='flex flex-col items-start gap-2'>
            <p className='text-lg'>Contact us</p>
            <p className='text-left font-light text-sm'>
              <a href={ALVIN_EMAIL_LINK}>Email: {ALVIN_EMAIL}</a>
            </p>
            <p className='text-left font-light text-sm'>
              <a href={WHATSAPP_LINK} target='_blank' rel='noopener'>
                WhatsApp: {WHATSAPP_NUMBER}
              </a>
            </p>
          </section>

          <iframe
            src='https://status.supercuansaham.id/badge?theme=dark'
            width='250'
            height='30'
            frameBorder='0'
            scrolling='no'
            title='Supercuan Saham Status'
          />
        </section>

        <section className='flex flex-wrap items-start justify-around gap-4 w-full h-fit'>
          {navigations.map(({ name, childs }) => {
            return (
              <section key={name} className='flex flex-col gap-4 w-fit h-fit'>
                <p className='text-lg'>{name}</p>
                <nav>
                  <ul className='flex flex-col gap-2'>
                    {childs.map(({ link, text, id }) => {
                      return (
                        <motion.li
                          key={id}
                          className='opacity-50 hover:opacity-100 focus:opacity-100 w-fit h-fit'
                          onMouseEnter={() => {
                            setHoverLink(id)
                          }}
                          onMouseLeave={() => {
                            setHoverLink(null)
                          }}
                          onFocus={() => {
                            setHoverLink(id)
                          }}
                        >
                          <div className='w-fit h-fit flex flex-col gap-0'>
                            <Link
                              href={link}
                              className='flex items-center justify-center gap-2'
                              target={name === 'Social' ? '_blank' : '_self'}
                            >
                              {text} {name === 'Social' && <ExternalLink className='w-4 h-4' />}
                            </Link>

                            {hoverLink === id && (
                              <motion.div
                                className='bg-supercuan-secondary'
                                initial={{ width: '0%', height: 0 }}
                                animate={{ width: '100%', height: 2 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </div>
                        </motion.li>
                      )
                    })}
                  </ul>
                </nav>
              </section>
            )
          })}
        </section>

        <section className='w-full h-fit flex md:flex-col flex-row items-start justify-around gap-8'>
          <section className='flex flex-col md:items-start items-start justify-center gap-2'>
            <p className='md:text-lg text-base font-medium'>Join membership</p>

            <Link
              href={isSignedIn ? '/' : parseUrl('web', '/sign-up', { utm_source: 'footer-marketing' })}
              target={isSignedIn ? '_self' : '_blank'}
              className='w-full h-full'
            >
              <motion.button
                className='bg-supercuan-secondary text-supercuan-primary rounded-lg shadow-lg px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed'
                whileHover={{ scale: isSignedIn ? 1 : 1.1 }}
                type='button'
                disabled={isSignedIn}
                tabIndex={-1}
                onClick={() => {
                  posthogCapture('register_button_clicked', { location: 'footer-marketing' })
                }}
              >
                Gabung sekarang
              </motion.button>
            </Link>
          </section>

          <section className='flex flex-col md:items-start items-start justify-center gap-2'>
            <p className='md:text-lg text-base font-medium'>Sudah member?</p>

            <Link
              href={isSignedIn ? '/' : parseUrl('web', '/sign-in', { utm_source: 'footer-marketing' })}
              target={isSignedIn ? '_self' : '_blank'}
              className='w-fit h-fit'
            >
              <button
                className='border border-supercuan-secondary rounded-lg flex items-center justify-center gap-2 px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed'
                type='button'
                disabled={isSignedIn}
                tabIndex={-1}
                onClick={() => {
                  posthogCapture('login_button_clicked', { location: 'footer-marketing' })
                }}
              >
                Login <LogIn className='w-4 h-4' />
              </button>
            </Link>
          </section>
        </section>
      </footer>
    </div>
  )
}
