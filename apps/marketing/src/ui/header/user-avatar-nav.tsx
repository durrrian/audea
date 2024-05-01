'use client'

import { motion } from 'framer-motion'
import { useClerk } from '@clerk/nextjs'
import { AppWindow, Banknote, LogOut } from 'lucide-react'
import Link from 'next/link'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { parseUrl } from '@repo/helper'
import type { CurrentProfile } from '@repo/clerk-action'
import { posthog, posthogCapture } from '@repo/api'
import { useRouter } from 'next/navigation'

interface UserAvatarNavProps {
  isScroll: boolean
  user: CurrentProfile
}

export function UserAvatarNav({ isScroll, user }: UserAvatarNavProps) {
  const { signOut } = useClerk()

  const router = useRouter()

  const membership = user.membership

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          animate={isScroll ? 'whenScrolled' : 'whenNotScrolled'}
          variants={{
            whenScrolled: {
              scale: 1.1,
              boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
            },
            whenNotScrolled: { scale: 1 },
            hover: { backgroundColor: 'black' },
          }}
          whileHover='hover'
          className='fixed top-8 md:right-6 right-2 w-fit h-fit rounded-full flex items-center justify-center'
          type='button'
        >
          <Avatar className='h-12 w-12'>
            <AvatarImage src={user.photoUrl ?? undefined} alt='Profile Picture' />
            <AvatarFallback className={cn('bg-supercuan-primary text-supercuan-secondary')}>
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1 max-w-full truncate'>
            <p className='text-sm font-medium leading-none'>{user.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={!membership}>
            <Link
              className='w-full h-full flex items-center'
              href={membership ? parseUrl('web', '/') : '/'}
              prefetch
              target={membership ? '_blank' : '_self'}
            >
              Go to App
              <DropdownMenuShortcut>
                <AppWindow className='w-5 h-5' />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className='w-full h-full flex items-center'
              href={
                membership
                  ? parseUrl('web', '/settings/membership')
                  : parseUrl('web', '/pick-membership', { utm_source: 'nav-marketing' })
              }
              prefetch
              target='_blank'
              onClick={() => {
                posthogCapture('manage_membership_button_clicked', { location: 'nav-marketing' })
              }}
            >
              {membership ? 'Manage membership' : 'Buy membership'}
              <DropdownMenuShortcut>
                <Banknote className='w-5 h-5' />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await signOut()
            posthog.reset()
            router.push(parseUrl('web', '/sign-in').href)
          }}
          className='cursor-pointer'
        >
          Log out
          <DropdownMenuShortcut>
            <LogOut className='w-5 h-5' />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
