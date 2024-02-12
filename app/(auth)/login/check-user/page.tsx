import sendWelcomeEmail from '@/defer/send-welcome-email'
import { db } from '@/utils/prisma'
import { auth, clerkClient } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface Prop {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: Prop) {
  const redirect_url = searchParams.redirect_url as string | undefined

  const { userId: clerkUserId } = auth()

  if (!clerkUserId) return redirect('/login')

  const currentUser = await db.user.findFirst({ where: { clerkUserId } })

  if (currentUser) return redirect_url ? redirect(decodeURIComponent(redirect_url)) : redirect('/new')

  const userData = await clerkClient.users.getUser(clerkUserId)

  const email = userData.emailAddresses.find((v) => v.id === userData.primaryEmailAddressId)?.emailAddress as string
  const firstName = userData.firstName as string
  const lastName = userData.lastName as string

  const user = await db.user.create({ data: { clerkUserId, email, firstName, lastName } })

  await db.contentSettings.create({
    data: { userId: user.id, writingStyle: 'ASK', outputLanguage: 'ASK', typeOfPromptId: '65c9be8cd307e37b7f43ae9d' },
  })

  await sendWelcomeEmail(user.email, user.firstName, user.lastName)

  return redirect_url ? redirect(decodeURIComponent(redirect_url)) : redirect('/new')
}
