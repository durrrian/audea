'use server'

import { db } from '@/utils/prisma'

export const getQuotas = async () => {
  const result = await db.subscription.count({ where: { type: 'LIFETIME40' } })

  return result
}
