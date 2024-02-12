'use server'

import sendWelcomeEmail from '@/defer/send-welcome-email'
import { db } from '@/utils/prisma'

export const createUser = async (email: string, clerkUserId: string, firstName: string, lastName: string) => {
  try {
    const user = await db.user.create({ data: { email, clerkUserId, firstName, lastName } })

    await db.contentSettings.create({
      data: { userId: user.id, writingStyle: 'ASK', outputLanguage: 'ASK', typeOfPromptId: '65c9be8cd307e37b7f43ae9d' },
    })

    await sendWelcomeEmail(user.email, user.firstName, user.lastName)

    return
  } catch (e: any) {
    throw new Error(e)
  }
}
