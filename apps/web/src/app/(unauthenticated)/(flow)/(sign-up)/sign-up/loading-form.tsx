'use client'

import cn from '@repo/tailwind-config/cn'
import { Separator, Skeleton } from '@repo/web-ui/components'
import Link from 'next/link'
import { RegisterProgressBar } from '~/ui/register-progress-bar'

export function LoadingForm() {
  return (
    <div className='border-border bg-background relative z-10 flex min-h-[min(800px,80dvh)] w-full max-w-lg flex-col rounded-xl border p-6'>
      <div className='space-y-2 mb-4'>
        <div className='h-fit'>
          <Skeleton className='w-full h-[32px] rounded-full max-w-[100px] mb-2' />

          <Skeleton className='w-full h-[17px] rounded-full max-w-[200px] mb-2' />
        </div>
        <Separator />
      </div>

      <div className='flex w-full flex-1 flex-col gap-y-4'>
        <fieldset className={cn('flex w-full flex-col gap-y-4', 'h-fit max-h-full')}>
          <div className='w-full'>
            <Skeleton className='w-full h-[17px] rounded-full max-w-[36px] mb-2' />

            <Skeleton className='w-full h-[40px] rounded-md' />
          </div>

          <div className='w-full'>
            <Skeleton className='w-full h-[17px] rounded-full max-w-[36px] mb-2' />

            <Skeleton className='w-full h-[40px] rounded-md' />
          </div>

          <div className='w-full'>
            <Skeleton className='w-full h-[17px] rounded-full max-w-[40px] mb-2' />

            <Skeleton className='w-full h-[40px] rounded-md' />
          </div>

          <p className='text-muted-foreground mt-4 text-sm'>
            Sudah punya akun?{' '}
            <Link href='/sign-in' className='duration-200 hover:opacity-70'>
              Masuk
            </Link>
          </p>
        </fieldset>

        <RegisterProgressBar width='25%' className='mt-6'>
          <p className='text-muted-foreground text-sm'>
            <span className='font-medium'>Identitas diri</span> 1/2
          </p>
        </RegisterProgressBar>

        <div className='flex items-center gap-x-4'>
          <Skeleton className='w-full h-[44px] rounded-md' />
        </div>
      </div>
    </div>
  )
}
