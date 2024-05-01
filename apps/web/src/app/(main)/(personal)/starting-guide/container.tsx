'use client'

import { useMediaQuery } from '@repo/web-ui/hooks'
import { useSidebar } from '~/hooks/use-sidebar'
import { Mobile } from './mobile'
import { BottomButton } from './bottom-button'
import { Desktop } from './desktop'

export function Container({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useSidebar()

  const isMobile = useMediaQuery('(max-width: 768px)')

  const isMobileExtend = useMediaQuery('(max-width: 1024px)')

  if (isMobile || (isSidebarOpen && isMobileExtend)) {
    return (
      <div className='flex flex-col items-center justify-center select-none md:text-clip'>
        <Mobile />
        <section className='w-full h-fit md:px-2 px-4 space-y-10 pb-16 pt-8'>
          {children}
          <BottomButton />
        </section>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-[1fr_10fr] gap-x-8 select-none'>
      <Desktop />
      <section className='w-full h-fit max-w-[800px] space-y-20 pt-14 pb-20 md:px-2 px-4'>
        {children}
        <BottomButton />
      </section>
    </div>
  )
}
