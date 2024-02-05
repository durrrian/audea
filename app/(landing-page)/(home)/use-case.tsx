import Image from 'next/image'
import { Heading } from './lib/heading'
import { SubHeading } from './lib/sub-heading'

export default function Usecase() {
  return (
    <section
      className='max-w-[1300px] mx-auto text-landingPage-textSurfaceVariant dark:text-landingPage-textSurfaceVariant flex flex-col items-center justify-center text-center gap-12 pt-10 pb-10 px-4 scroll-mt-20'
      id='use-case'
    >
      <header className='flex flex-col gap-4'>
        <Heading as={'h4'}>And yes, it can fit any purpose, no matter what you&apos;re up to</Heading>

        <SubHeading>Audea understands that your individual needs can vary from time to time.</SubHeading>
      </header>

      <section
        className='w-full h-fit flex flex-col gap-12 px-2 py-8 rounded-3xl shadow-xl'
        style={{
          background:
            'radial-gradient(70.71% 70.71% at 50% 50%, rgba(171, 199, 255, 0.45) 0%, rgba(255, 255, 255, 0.00) 100%)',
        }}
      >
        <section className='lg:grid lg:grid-cols-2 flex flex-wrap items-center justify-center gap-8'>
          {[
            {
              title: 'Exploring ideas',
              src: '/landing-page/bullet_points_with_summary.svg',
              alt: 'Audea with type of prompt bullet points with summary',
            },

            {
              title: 'Refining your talk',
              src: '/landing-page/refine_my_words.svg',
              alt: 'Audea with type of prompt refine words and phrases',
            },
          ].map(({ title, src, alt }, i) => {
            return (
              <section key={i} className='space-y-4'>
                <p className='font-medium text-2xl'>{title}</p>

                <Image
                  src={src}
                  alt={alt}
                  quality={100}
                  draggable={false}
                  className='max-w-[618px] w-full mx-auto'
                  width={618}
                  height={618}
                />
              </section>
            )
          })}
        </section>

        <section className='w-full h-fit flex items-center justify-around flex-wrap gap-x-10 gap-y-2 font-base text-lg'>
          <p>Summarize meeting session</p>

          <p>Perfecting your pitch</p>

          <p className='text-transparent bg-clip-text bg-gradient-to-b from-landingPage-linierFooterTop to-landingPage-linierFooterBottom'>
            and many more...
          </p>
        </section>
      </section>
    </section>
  )
}
