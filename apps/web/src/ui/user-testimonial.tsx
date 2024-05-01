'use client'

import Image from 'next/image'
import cn from '@repo/tailwind-config/cn'
import { VerifiedIcon } from '@repo/web-ui/icons'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { Avatar, AvatarFallback } from '@repo/web-ui/components'

export interface UserTestimonialProps {
  className?: string
  imageSrc: string | StaticImport | null
  name: string
  company: string
  testimonial: JSX.Element
}

export function UserTestimonial({ className, imageSrc, testimonial, company, name }: UserTestimonialProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-xl bg-supercuan-secondary px-4 py-8 text-supercuan-primary border border-supercuan-primary shadow-md h-fit',
        className,
      )}
    >
      <div className='mt-4'>
        {imageSrc ? (
          <Image
            src={imageSrc}
            className='h-20 w-20 rounded-full object-cover'
            alt={`image of ${name}`}
            width={80}
            height={80}
          />
        ) : (
          <Avatar className='h-20 w-20 rounded-full'>
            <AvatarFallback className='bg-supercuan-primary text-supercuan-secondary text-[2.5rem]'>
              {name[0]}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      <div className='mt-6'>
        <div className='space-y-2'>
          <div className='flex items-center justify-center gap-x-2'>
            <h2 className='text-2xl font-semibold'>{name}</h2>
            {imageSrc !== null && <VerifiedIcon className='text-supercuan-primary h-8 w-8' />}
          </div>

          <p className='max-w-[40ch] text-center text-sm font-medium'>{company}</p>
        </div>

        <section className='text-muted-foreground mt-4 max-w-[40ch] text-justify flex flex-col gap-y-2 text-sm'>
          {testimonial}
        </section>
      </div>
    </div>
  )
}
