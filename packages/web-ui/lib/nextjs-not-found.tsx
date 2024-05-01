'use client'

import { Button } from '../components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export function NextJSNotFound() {
  const router = useRouter()

  return (
    <div className='min-w-[100dvw] min-h-[100dvh] overflow-hidden flex items-start justify-center select-none pt-20'>
      <div className='text-center flex flex-col items-center justify-center gap-y-8 px-2'>
        <div className='flex scale-75 items-center gap-2 self-center md:scale-100'>
          <div
            className='flex animate-pulse'
            style={{
              animationDelay: '219.927ms',
              transform: 'rotateX(14.2841deg) rotateY(21.7627deg) translateZ(0px)',
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='138' height='160' fill='none' viewBox='0 0 138 160'>
              <path
                fill='url(#paint0_linear_20_10)'
                d='M8.148 135a8 8 0 01-8-8v-23.422a8 8 0 011.25-4.292L62.165 3.708A8 8 0 0168.917 0h18.231a8 8 0 018 8v29a8 8 0 01-8 8h-5.087a8 8 0 00-6.767 3.732L43.11 99.762a.97.97 0 00.82 1.487h86.031a8 8 0 018 8.001V127a8 8 0 01-8 8H8.148zm77.813 25a8 8 0 01-8-8v-27.312L78.898 110V8a8 8 0 018-8h24.625a8 8 0 018 8v144a8 8 0 01-8 8H85.961z'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_20_10'
                  x1='69.055'
                  x2='69.055'
                  y1='0'
                  y2='160'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#808080' />
                  <stop offset='1' stopColor='#474747' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className='flex animate-pulse'
            style={{
              animationDelay: '665.891ms',
              transform: 'rotateX(14.2841deg) rotateY(21.7627deg) translateZ(0px)',
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='143' height='167' fill='none' viewBox='0 0 143 167'>
              <path
                fill='url(#paint0_linear_20_9)'
                d='M71.523 166.562c-14.532-.052-27.084-3.411-37.657-10.078-10.572-6.666-18.724-16.276-24.453-28.828C3.684 115.104.846 100.052.898 82.5.95 64.896 3.814 49.948 9.49 37.656c5.73-12.291 13.855-21.64 24.375-28.047C44.44 3.203 56.991 0 71.523 0c14.53 0 27.083 3.23 37.656 9.688 10.573 6.406 18.724 15.755 24.453 28.046 5.729 12.292 8.568 27.214 8.516 44.766 0 17.656-2.865 32.76-8.594 45.313-5.729 12.552-13.88 22.161-24.453 28.828-10.521 6.614-23.047 9.921-37.578 9.921zm0-35.312c7.5 0 13.645-3.906 18.437-11.719 4.844-7.864 7.24-20.208 7.188-37.031 0-10.99-1.094-19.974-3.282-26.953-2.187-6.98-5.208-12.136-9.062-15.469C80.95 36.693 76.523 35 71.523 35c-7.5 0-13.62 3.802-18.36 11.406-4.74 7.604-7.161 19.636-7.265 36.094-.052 11.198 1.015 20.417 3.203 27.656 2.187 7.188 5.208 12.5 9.062 15.938 3.907 3.437 8.36 5.156 13.36 5.156z'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_20_9'
                  x1='69.48'
                  x2='69.48'
                  y1='0'
                  y2='166.562'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#808080' />
                  <stop offset='1' stopColor='#474747' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className='flex animate-pulse'
            style={{
              animationDelay: '492.709ms',
              transform: 'rotateX(14.2841deg) rotateY(21.7627deg) translateZ(0px)',
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='138' height='160' fill='none' viewBox='0 0 138 160'>
              <path
                fill='url(#paint0_linear_20_10)'
                d='M8.148 135a8 8 0 01-8-8v-23.422a8 8 0 011.25-4.292L62.165 3.708A8 8 0 0168.917 0h18.231a8 8 0 018 8v29a8 8 0 01-8 8h-5.087a8 8 0 00-6.767 3.732L43.11 99.762a.97.97 0 00.82 1.487h86.031a8 8 0 018 8.001V127a8 8 0 01-8 8H8.148zm77.813 25a8 8 0 01-8-8v-27.312L78.898 110V8a8 8 0 018-8h24.625a8 8 0 018 8v144a8 8 0 01-8 8H85.961z'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_20_10'
                  x1='69.055'
                  x2='69.055'
                  y1='0'
                  y2='160'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#808080' />
                  <stop offset='1' stopColor='#474747' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <h1 className='mt-3 text-2xl font-bold md:text-3xl'>Oops! Something went wrong.</h1>

        <p className='text-muted-foreground mt-4 text-sm'>
          Halaman yang Anda cari telah dipindahkan, dihapus, diganti nama, atau mungkin tidak pernah ada.
        </p>

        <div className='mt-6 flex gap-x-2.5 gap-y-4 md:items-center'>
          <Button
            variant='ghost'
            className='w-32 bg-supercuan-blackPrimary hover:bg-supercuan-blackPrimary/90 text-supercuan-whitePrimary hover:text-supercuan-whitePrimary'
            onClick={() => {
              void router.back()
            }}
          >
            <ChevronLeft className='mr-2 h-4 w-4' />
            Kembali
          </Button>

          <Button className='w-32 bg-supercuan-primary text-supercuan-secondary hover:bg-supercuan-primary/90' asChild>
            <Link href='/'>Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
