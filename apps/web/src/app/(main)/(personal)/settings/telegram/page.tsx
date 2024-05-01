import { redirect } from 'next/navigation'
import { prisma } from '@repo/prisma'
import { currentProfile } from '@repo/clerk-action'
import { UserTelegram } from './user-telegram'
import { Connect } from './connect'

export default async function Page() {
  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  const membership = user.membership

  if (!membership) return redirect('/sign-up/pick-membership')

  if (membership && new Date() >= new Date(membership.endDate)) return redirect('/settings/membership')

  const telegram = await prisma.telegram.findUnique({ where: { userId: user.id } })

  if (telegram) {
    return (
      <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto'>
        <UserTelegram telegram={telegram} />
      </main>
    )
  }

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto'>
      <Connect />
    </main>
  )
}
