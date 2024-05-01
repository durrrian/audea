'use client'

import cn from '@repo/tailwind-config/cn'
import { AnimatePresence, motion } from 'framer-motion'
import backgroundFormImage from '@repo/assets/pattern/background-form.png'
import Image from 'next/image'
import { CarouselContent, Carousel as CarouselComponent, CarouselItem } from '@repo/web-ui/components'
import type { TestimonialData } from '@repo/web-ui/lib'
import Autoplay from 'embla-carousel-autoplay'
import { UserTestimonial } from '~/ui/user-testimonial'

interface RegisterFlowContainerProps {
  children: React.ReactNode
  className?: string
  carousel?: boolean
  testimonial: TestimonialData[]
}

export function RegisterFlowContainer({
  children,
  className,
  carousel = false,
  testimonial,
}: RegisterFlowContainerProps) {
  return (
    <div className={cn('flex justify-center gap-x-12 w-screen max-w-screen-2xl px-2', className)}>
      <div className='border-border relative hidden flex-1 overflow-hidden rounded-xl border xl:flex'>
        <div className='absolute -inset-8 z-[1] backdrop-blur'>
          <Image src={backgroundFormImage} fill alt='community-cards' />
        </div>

        <div className='bg-background/50 absolute -inset-8 z-0 backdrop-blur-[2px]' />

        <div className='relative flex h-full w-full flex-col items-center justify-evenly z-[2]'>
          <div className='bg-supercuan-primary text-supercuan-secondary rounded-2xl border px-4 py-1 text-sm font-medium'>
            Dapatkan cuan jangka panjang dengan mudah!
          </div>

          <AnimatePresence>
            <motion.div className='w-full max-w-md' layoutId='user-testimonial' suppressHydrationWarning>
              {carousel ? (
                <CarouselComponent
                  className={cn('w-full h-fit flex flex-col gap-y-10 z-10')}
                  plugins={[
                    Autoplay({
                      delay: 10000,
                    }),
                  ]}
                  opts={{ loop: true }}
                >
                  <CarouselContent className='w-full m-0 p-0 max-w-[1100px]'>
                    {testimonial.map((testi) => (
                      <CarouselItem key={testi.from} className='w-full m-0 px-2 py-0'>
                        <UserTestimonial
                          imageSrc={testi.img}
                          name={testi.from}
                          company={testi.cred ?? ''}
                          testimonial={testi.syntax}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </CarouselComponent>
              ) : null}

              {!carousel && (
                <UserTestimonial
                  imageSrc={testimonial[0].img}
                  name={testimonial[0].from}
                  company={testimonial[0].cred ?? ''}
                  testimonial={testimonial[0].syntax}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div />
        </div>
      </div>

      {children}
    </div>
  )
}
