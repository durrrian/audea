import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import { Signup } from './signup'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Audea — Sign Up',
  }
}

export default function Page() {
  const { userId } = auth()

  if (userId) return redirect('/new')

  return (
    <div className='container relative grid min-h-screen select-none flex-col items-center justify-center px-0 lg:max-w-none lg:grid-cols-2'>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div
          className='absolute inset-0 bg-cover'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)',
          }}
        />

        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Audea has helped me countless of hours and helped me deliver idea faster so that I can bring my
              projects into fruition! Highly recommended!&rdquo;
            </p>

            <footer className='text-sm'>Annissaa Maharani</footer>
          </blockquote>
        </div>
      </div>

      <Signup />
    </div>
  )
}
