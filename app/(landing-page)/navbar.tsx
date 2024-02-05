'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const navigationItem = [
  { name: 'Features', url: '#features' },
  { name: 'Use Case', url: '#use-case' },
  { name: 'Integration', url: '#integration' },
  { name: 'Pricing', url: '#pricing' },
]

export default function Navbar() {
  return (
    <div className='fixed inset-0 z-10 h-fit w-full backdrop-blur backdrop-filter'>
      <header className='text-landingPage-textSurfaceVariant dark:text-landingPage-textSurfaceVariant mx-auto flex max-w-[1300px] items-center justify-between bg-transparent px-4 pt-3 lg:px-0'>
        <Link className='h-fit w-fit' href='/'>
          <Image
            src={'/primary_logo.svg'}
            alt={'Audea logo'}
            quality={100}
            draggable={false}
            width={100}
            height={100}
          />
        </Link>

        <div className='from-landingPage-audeaBlue to-landingPage-lightBlue dark:from-landingPage-audeaBlue dark:to-landingPage-lightBlue hidden w-fit rounded-3xl bg-gradient-to-r p-[1px] font-light md:block'>
          <section className='bg-landingPage-blackPrimary dark:bg-landingPage-blackPrimary flex h-fit w-fit items-center justify-center gap-8 rounded-3xl px-8 py-2 text-sm'>
            {navigationItem.map(({ name, url }, id) => {
              return (
                <motion.a href={url} key={id} whileHover={{ scale: 1.05 }}>
                  {name}
                </motion.a>
              )
            })}
          </section>
        </div>

        <section className='flex items-center gap-2 text-sm'>
          <Link
            href={'/login'}
            prefetch={true}
            className='rounded-3xl px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-800'
          >
            Sign in
          </Link>

          <Link
            href={'/signup'}
            prefetch={true}
            className='from-landingPage-linierPurple to-landingPage-linierMidBlue dark:from-landingPage-linierPurple dark:to-landingPage-linierMidBlue flex items-center rounded-3xl bg-gradient-to-br px-4 py-2 hover:opacity-90'
          >
            Get started <ChevronRight className='ml-2 h-4 w-4' />
          </Link>
        </section>
      </header>

      <div className='from-landingPage-linierLineSide via-landingPage-linierLineMid to-landingPage-linierLineSide dark:from-landingPage-linierLineSide dark:via-landingPage-linierLineMid dark:to-landingPage-linierLineSide mt-3 h-[0.5px] bg-gradient-to-r md:mt-4' />
    </div>
  )
}
