import { midtrans } from '@repo/api'
import { currentProfile } from '@repo/clerk-action'
import { notFound, redirect } from 'next/navigation'

interface Prop {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: Prop) {
  if (!searchParams.order_id || !searchParams.redirect_url) return notFound()

  const orderId = decodeURIComponent(searchParams.order_id.toString())
  const redirectUrl = decodeURIComponent(searchParams.redirect_url.toString())

  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  const paymentStatus = await midtrans.transaction.status(orderId)

  if (paymentStatus.transaction_status !== 'cancel') {
    await midtrans.transaction.cancel(orderId)
  }

  return redirect(redirectUrl)
}
