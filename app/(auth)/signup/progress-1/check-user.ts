'use server'

import { db } from '@/utils/prisma'

export const checkUser = async (email: string) => {
  const user = await db.user.findFirst({ where: { email } })

  return user
}
