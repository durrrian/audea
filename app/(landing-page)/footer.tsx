'use client'

import Image from 'next/image'
import Link from 'next/link'
import { navigationItem } from './navbar'

export default function Footer() {
  const navigations = [
    {
      name: 'Privacy Policy',
      url: '/privacy-policy',
    },

    {
      name: 'Terms of Service',
      url: '/terms-of-service',
    },
  ]

  return (
    <div className='text-landingPage-textSurfaceVariant dark:text-landingPage-textSurfaceVariant select-none'>
      <div className='from-landingPage-linierLineSide via-landingPage-linierLineMid to-landingPage-linierLineSide dark:from-landingPage-linierLineSide dark:via-landingPage-linierLineMid dark:to-landingPage-linierLineSide mb-3 h-[0.5px] bg-gradient-to-r md:mb-4' />

      <footer className='mx-auto grid max-w-[1300px] grid-cols-1 grid-rows-4 content-center items-end justify-start gap-4 px-4 pb-10 md:grid-cols-2 md:grid-rows-2'>
        <ul className='flex flex-wrap items-center gap-x-8 gap-y-0'>
          {navigations.map(({ name, url }, i) => {
            return (
              <li key={i}>
                <Link
                  href={url}
                  className='from-landingPage-linierFooterTop to-landingPage-linierFooterBottom hover:text-landingPage-textSurfaceVariant dark:from-landingPage-linierFooterTop dark:to-landingPage-linierFooterBottom dark:hover:text-landingPage-textSurfaceVariant bg-gradient-to-b bg-clip-text font-normal text-transparent'
                >
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>

        <section className='md:grid md:justify-self-end'>
          <p>Sitemap</p>

          <ul className='flex flex-wrap items-center gap-x-8 gap-y-0'>
            {navigationItem.map(({ name, url }, i) => {
              return (
                <li key={i}>
                  <Link
                    href={url}
                    className='from-landingPage-linierFooterTop to-landingPage-linierFooterBottom hover:text-landingPage-textSurfaceVariant dark:from-landingPage-linierFooterTop dark:to-landingPage-linierFooterBottom dark:hover:text-landingPage-textSurfaceVariant bg-gradient-to-b bg-clip-text font-normal text-transparent'
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        <section className='flex h-fit w-fit items-center gap-2'>
          <Link href='https://github.com/durrrian/audea' target='_blank'>
            <Image src='/custom-icon/github.png' alt='Github logo' className='w-5' width={20} height={20} />
          </Link>
          <Link href='https://twitter.com/audea_app' target='_blank'>
            <Image src='/custom-icon/twitter.png' alt='Twitter logo' className='w-5' width={20} height={20} />
          </Link>
        </section>
      </footer>
    </div>
  )
}
