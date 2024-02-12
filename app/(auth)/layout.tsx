'use client'

import { buttonVariants } from '@/components'
import { Logo } from '@/lib/logo'
import cn from '@/utils/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/login' || pathname === '/signup') {
    return (
      <main className='min-w-screen relative min-h-screen select-none'>
        <header className='fixed inset-0 z-50 flex h-fit w-full items-center justify-between px-2 py-4 md:px-4 md:py-8 '>
          <div className='h-fit w-fit px-3'>
            <Logo size={100} />
          </div>
          <Link
            href={pathname === '/login' ? '/signup' : '/login'}
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            {pathname === '/login' ? 'Sign up' : 'Log in'}
          </Link>
        </header>

        {children}
      </main>
    )
  }

  return <>{children}</>
}
