import cn from '@repo/tailwind-config/cn'
import { Button } from '@repo/web-ui/components'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { LoadingBar } from './loading-bar'

export default function AnalisisNonEmitenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className={cn(
          'md:px-10 md:pt-10 md:pb-4 p-2 sticky inset-0 z-10 bg-supercuan-secondary shadow-sm select-none flex flex-col gap-4 w-full',
        )}
      >
        <nav className='w-full h-fit  md:gap-8 gap-4 grid md:grid-cols-[1fr_6fr_1fr] grid-cols-[1fr_6fr] items-center justify-center bg-supercuan-secondary'>
          <Link className='w-fit h-fit' href='/analisis'>
            <Button
              className={cn(
                'w-fit h-fit flex items-center justify-center gap-2 md:text-lg text-sm md:px-2 px-1.5 md:py-1.5 py-1',
              )}
              variant='default'
            >
              <ArrowLeft className='md:w-6 w-4 md:h-6 h-4' />

              <span>Kembali</span>
            </Button>
          </Link>

          <LoadingBar />

          <div />
        </nav>
      </div>

      {children}
    </>
  )
}
