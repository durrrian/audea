import { Card, CardDescription, CardHeader, CardTitle, buttonVariants } from '@/components'
import cn from '@/utils/cn'
import { Login } from './login'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Audea — Login',
  }
}

interface Prop {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: Prop) {
  const redirect_url = searchParams.redirect_url as string | undefined

  const { userId } = auth()

  if (userId) return redirect('/new')

  return (
    <div className='mt-20 h-fit w-full px-2 pb-20 sm:px-0 md:mt-40'>
      <Card className={cn('mx-auto h-[540px] w-full max-w-[400px]')}>
        <CardHeader>
          <CardTitle>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Sign in</h1>
            </div>
          </CardTitle>
          <CardDescription className={cn('text-left')}>To continue to Audea</CardDescription>
        </CardHeader>

        <Login redirectUrl={redirect_url} />
      </Card>
    </div>
  )
}
