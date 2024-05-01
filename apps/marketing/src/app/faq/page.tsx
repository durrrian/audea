import type { Metadata } from 'next'
import { HeadingWithLogo } from '~/ui/heading-with-logo'
import { Accordion } from './accordion'

export function generateMetadata(): Metadata {
  return {
    title: 'Supercuan Saham — FAQ',
  }
}

export default function Page() {
  return (
    <main className='max-w-[1400px] mx-auto mt-10 mb-40 space-y-20'>
      <header className='flex flex-col items-center justify-center text-center gap-8'>
        <HeadingWithLogo>FAQ</HeadingWithLogo>
        <h1 className='lg:text-5xl md:text-4xl text-3xl text-black font-bold'>Frequently asked questions</h1>
      </header>

      <div className='w-full h-fit px-2'>
        <Accordion />
      </div>
    </main>
  )
}
