'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import cn from '@repo/tailwind-config/cn'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@repo/web-ui/components'
import links from './links'

export function Mobile() {
  const pathname = usePathname()

  const router = useRouter()

  return (
    <nav className='bg-supercuan-secondary text-supercuan-primary flex items-center justify-end sticky inset-0 shadow-sm text-center p-4 select-none z-10 w-full h-fit text-sm justify-items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className={cn('w-fit')}>
            {links.find((v) => v.path === pathname)?.name} <ChevronDown className='ml-2 w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-full'>
          <DropdownMenuLabel>Starting Guide</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={pathname}
            onValueChange={(v) => {
              router.push(v)
            }}
          >
            {links.map((v) => {
              return (
                <DropdownMenuRadioItem key={v.id} value={v.path}>
                  {v.name}
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
