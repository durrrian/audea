import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { LottieAnimation, RedirectButton } from '@repo/web-ui/components'
import { currentProfile } from '@repo/clerk-action'

export function generateMetadata(): Metadata {
  return {
    title: 'Supercuan Saham — Pembayaran Error',
  }
}

interface Prop {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: Prop) {
  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  const membership = user.membership

  const orderId = searchParams.order_id ? searchParams.order_id.toString() : undefined

  let redirectUrl = '/pick-membership'

  if (membership) redirectUrl = '/'

  if (!orderId && !membership) redirectUrl = '/pick-membership'

  if (orderId && !membership) {
    const orderIdArr = orderId.split('-')

    if (orderIdArr.length !== 4) return notFound()

    const tier = orderIdArr[3]

    if (tier !== 'BRONZE' && tier !== 'SILVER' && tier !== 'GOLD' && tier !== 'PLATINUM') return notFound()

    if (!membership) redirectUrl = `/pick-membership?tier=${tier}`
  }

  return (
    <main className='w-fit h-fit max-w-[1100px] mx-auto md:px-2 px-4 flex flex-col items-center justify-center gap-10 overflow-x-hidden mb-20 mt-4'>
      <section className='flex flex-col items-center justify-center gap-2 text-center'>
        <div className='w-[300px] h-[300px]'>
          <LottieAnimation
            animationConfig={{ path: '/lottie/x-animation-lottiefiles.json', loop: false, autoplay: true }}
          />
        </div>

        <h1 className='sm:text-4xl text-2xl font-medium text-supercuan-error'>Pembayaran gagal ❌</h1>

        <p className='sm:text-2xl text-xl font-normal'>
          Ada masalah di <em>payment processor</em> yang kita pakai
        </p>

        <p className='sm:text-2xl text-xl font-normal'>
          Kamu akan di <em>redirect</em> kembali ke laman pembayaran...
        </p>
      </section>

      <div className='flex w-full items-center justify-center'>
        <RedirectButton redirectUrl={redirectUrl} text='Kembali ke laman pembayaran' countdown={15} />
      </div>
    </main>
  )
}
