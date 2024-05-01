import { posthogCapture } from '@repo/api'
import { parseUrl } from '@repo/helper'
import cn from '@repo/tailwind-config/cn'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@repo/web-ui/components'
import Link from 'next/link'

export function LoadingForm() {
  return (
    <Card className={cn('w-full h-fit min-h-[500px] mx-auto max-w-[400px] bg-supercuan-secondary mt-8')}>
      <CardHeader>
        <CardTitle>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='text-2xl font-semibold tracking-tight'>Masuk</h1>
          </div>
        </CardTitle>
        <CardDescription className={cn('text-left')}>Untuk lanjut ke Supercuan Saham</CardDescription>
      </CardHeader>

      <CardContent className={cn('flex flex-col gap-8 my-10')}>
        <Skeleton className='w-full h-[44px] rounded-md' />

        <div className='relative flex items-center justify-center gap-x-4 py-2 text-xs uppercase'>
          <div className='bg-supercuan-primary h-px flex-1' />
          <span className='text-supercuan-primary bg-transparent'>Atau</span>
          <div className='bg-supercuan-primary h-px flex-1' />
        </div>

        <div className='flex flex-col gap-y-4 w-full'>
          <div>
            <Skeleton className='w-full h-[17px] rounded-full max-w-[36px] mb-2' />

            <Skeleton className='w-full h-[40px] rounded-md' />
          </div>

          <Skeleton className='w-full h-[44px] rounded-md' />

          <p className='text-xs'>
            Belum punya akun?{' '}
            <Link
              href={parseUrl('web', '/sign-up', { utm_source: 'form-onsignin-web' })}
              className='text-blue-500'
              onClick={() => {
                posthogCapture('register_button_clicked', { location: 'form-onsignin-web' })
              }}
            >
              Registrasi
            </Link>
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <p className='text-xs text-justify select-none'>
          By clicking &quot;Continue with Google / Email&quot; above, you acknowledge that you have read and understood,
          and agree to Supercuan Saham&apos;s{' '}
          <Link
            href={parseUrl('marketing', '/terms-of-service')}
            className='hover:text-blue-500'
            prefetch
            target='_blank'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href={parseUrl('marketing', '/privacy-policy')}
            className='hover:text-blue-500'
            prefetch
            target='_blank'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  )
}
