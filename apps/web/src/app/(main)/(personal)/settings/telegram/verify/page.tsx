import { notFound, redirect } from 'next/navigation'
import { prisma } from '@repo/prisma'
import { currentProfile } from '@repo/clerk-action'
import { Client } from './client'

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: PageProps) {
  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  const membership = user.membership

  if (!membership) return redirect('/pick-membership')

  if (membership && new Date() >= new Date(membership.endDate)) return redirect('/settings/membership')

  const telegram = await prisma.telegram.findUnique({ where: { userId: user.id } })

  if (telegram) return redirect('/settings/telegram')

  if (
    !searchParams.first_name ||
    typeof searchParams.first_name !== 'string' ||
    !searchParams.auth_date ||
    typeof searchParams.auth_date !== 'string' ||
    !searchParams.hash ||
    typeof searchParams.hash !== 'string' ||
    !searchParams.id ||
    typeof searchParams.id !== 'string'
  ) {
    return notFound()
  }

  const firstName = searchParams.first_name
  const lastName =
    searchParams.last_name && typeof searchParams.last_name === 'string' ? searchParams.last_name : undefined
  const authDate = searchParams.auth_date
  const hash = searchParams.hash
  const telegramId = searchParams.id
  const username =
    searchParams.username && typeof searchParams.username === 'string' ? searchParams.username : undefined
  const photoUrl =
    searchParams.photo_url && typeof searchParams.photo_url === 'string'
      ? decodeURIComponent(searchParams.photo_url)
      : undefined

  const data = {
    first_name: firstName,
    last_name: lastName,
    auth_date: authDate,
    hash,
    telegram_id: telegramId,
    username,
    photo_url: photoUrl,
  }

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto flex items-center justify-center'>
      <Client telegramData={data} />
    </main>
  )
}
