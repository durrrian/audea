'use client'

import { Heading } from './lib/heading'
import { SubHeading } from './lib/sub-heading'
import useViewport from '@/hooks/use-viewport'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import Image from 'next/image'

export default function Features() {
  const { xs, sm, md } = useViewport()

  const isMobile = xs || sm || md

  const featuresList = [
    {
      title: 'Select the prompt style',
      desktop: '/features/desktop/type_of_prompt.svg',
      mobile: '/features/mobile/type_of_prompt.svg',
      alt: 'Audea feature: select type of prompt',
      section: 'top',
    },

    {
      title: 'Choose the writing style',
      desktop: '/features/desktop/writing_style.svg',
      mobile: '/features/mobile/writing_style.svg',
      alt: 'Audea feature: writing style',
      section: 'top',
    },

    {
      title: 'Choose the output language',
      desktop: '/features/desktop/output_language.svg',
      mobile: '/features/mobile/output_language.svg',
      alt: 'Audea feature: output language',
      section: 'bottom',
    },

    {
      title: 'Upload audio file or just click the record button ',
      desktop: '/features/desktop/upload_or_record.svg',
      mobile: '/features/mobile/upload_or_record.svg',
      alt: 'Audea feature: upload or record audio',
      section: 'bottom',
    },
  ]

  return (
    <section
      className='max-w-[1300px] mx-auto text-landingPage-textSurfaceVariant dark:text-landingPage-textSurfaceVariant flex flex-col items-center justify-center text-center gap-12 pt-10 pb-10 px-4 scroll-mt-20'
      id='features'
    >
      <header className='flex flex-col gap-4'>
        <Heading as='h2'>No complex and unnecessary features that will confuse you</Heading>

        <SubHeading>Every feature is designed with a lot of thought.</SubHeading>
      </header>

      {(() => {
        if (!isMobile) {
          return (
            <section className='flex flex-col gap-4'>
              <section className='grid grid-cols-[2fr_1fr] gap-4'>
                {featuresList
                  .filter(({ section }) => section === 'top')
                  .map(({ title, desktop, alt }, i) => {
                    return <FeatureCard key={i} title={title} src={desktop} alt={alt} />
                  })}
              </section>

              <section className='grid grid-cols-[1fr_2fr] gap-4'>
                {featuresList
                  .filter(({ section }) => section === 'bottom')
                  .map(({ title, desktop, alt }, i) => {
                    return <FeatureCard key={i} title={title} src={desktop} alt={alt} />
                  })}
              </section>
            </section>
          )
        } else {
          return (
            <section className='w-full h-full flex items-start  gap-4 overflow-auto'>
              {featuresList.map(({ title, mobile, alt }, i) => {
                return <FeatureCard key={i} title={title} src={mobile} alt={alt} />
              })}
            </section>
          )
        }
      })()}
    </section>
  )
}

interface IFeatureCard extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  src: string | StaticImport
  alt: string
  title: string
}

const FeatureCard = ({ title, src, alt, children, ...props }: IFeatureCard) => {
  return (
    <section
      className='flex flex-col gap-8 items-center justify-start md:max-h-[800px] max-h-[320px] overflow-hidden rounded-3xl py-8 px-4 bg-gradient-to-b from-landingPage-linierGray to-landingPage-linierEndGray shadow-md w-full min-w-[250px] min-h-[320px]'
      {...props}
    >
      <p className='md:text-xl text-lg font-medium'>{title}</p>

      <Image src={src} alt={alt} quality={100} draggable={false} className='w-fit h-fit' width={800} height={800} />

      {children}
    </section>
  )
}
