'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from '@repo/tailwind-config/cn'
import { Button } from '@repo/web-ui/components'
import links from './links'

export function Desktop() {
  const pathname = usePathname()

  return (
    <aside className='bg-supercuan-secondary text-supercuan-primary sticky inset-0 flex flex-col items-start text-left justify-start shadow-inner px-6 pt-14 select-none h-[100dvh] z-10 w-full'>
      {links.map((v) => {
        const disabled = pathname === v.path

        return (
          <Link
            href={!disabled ? v.path : `${v.path}#`}
            key={v.id}
            className={cn('w-fit h-fit', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
          >
            <Button
              className={cn('whitespace-nowrap', 'disabled:cursor-not-allowed')}
              variant='link'
              disabled={pathname === v.path}
            >
              {v.name}
            </Button>
          </Link>
        )
      })}
    </aside>
  )
}
