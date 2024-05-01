'use client'

import { testimonialData } from '@repo/web-ui/lib'
import { InfiniteMovingCards } from '@repo/web-ui/animation/infinite-moving-cards'
import { HeadingWithLogo } from '~/ui/heading-with-logo'

export function Testimonial() {
  return (
    <section className='max-w-[1400px] px-2 mx-auto space-y-10 scroll-mt-10' id='testimonial'>
      <section className='font-bold text-center space-y-4'>
        <HeadingWithLogo>Testimonial</HeadingWithLogo>
        <h4 className='lg:text-5xl md:text-4xl text-3xl text-black'>Mereka yang sudah bergabung</h4>
      </section>

      <div>
        <InfiniteMovingCards
          withShadow={false}
          items={testimonialData}
          direction='right'
          speed='200s'
          // containerClassName='w-full bg-green-500'
          sameHeight={false}
          itemClassName='bg-supercuan-secondary text-supercuan-primary border-supercuan-primary'
          footerClassName='bg-supercuan-primary text-supercuan-secondary'
        />
      </div>
    </section>
  )
}
