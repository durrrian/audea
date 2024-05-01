'use client'

import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import links from './links'

export function BottomButton() {
  const pathname = usePathname()

  const router = useRouter()

  const isTheFirstOne = pathname === links[0].path
  const isTheLastOne = pathname === links[links.length - 1].path

  function renderPreviousPath() {
    if (pathname === links[0].path) {
      return `${links[0].path}#`
    }

    if (pathname === links[1].path) {
      return links[0].path
    }

    if (pathname === links[2].path) {
      return links[1].path
    }

    if (pathname === links[3].path) {
      return links[2].path
    }

    return `${links[0].path}#`
  }

  function renderNextPath() {
    if (pathname === links[0].path) {
      return links[1].path
    }

    if (pathname === links[1].path) {
      return links[2].path
    }

    if (pathname === links[2].path) {
      return links[3].path
    }

    if (pathname === links[3].path) {
      return `${links[3].path}#`
    }

    return `${links[3].path}#`
  }

  return (
    <footer className='w-full h-fit flex items-center justify-center md:gap-x-10 gap-x-6 flex-nowrap'>
      <Button
        variant={isTheFirstOne ? 'outline' : 'default'}
        disabled={isTheFirstOne}
        className={cn('disabled:cursor-not-allowed')}
        onClick={() => {
          router.push(renderPreviousPath())
        }}
      >
        <ArrowLeftCircle className='w-4 h-4 mr-2' />
        Sebelumnya
      </Button>

      <Button
        variant={isTheLastOne ? 'outline' : 'default'}
        disabled={isTheLastOne}
        className={cn('disabled:cursor-not-allowed')}
        onClick={() => {
          router.push(renderNextPath())
        }}
      >
        Selanjutnya
        <ArrowRightCircle className='w-4 h-4 ml-2' />
      </Button>
    </footer>
  )
}
