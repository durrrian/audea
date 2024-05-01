'use server'

import { prisma } from '@repo/prisma'

export async function getTierFromSearchparam(tierParam: string | string[] | undefined) {
  try {
    if (!tierParam) return undefined

    if (typeof tierParam !== 'string') return undefined

    if (tierParam !== 'BRONZE' && tierParam !== 'SILVER' && tierParam !== 'GOLD' && tierParam !== 'PLATINUM') {
      return undefined
    }
    const prices = await prisma.prices.findFirst({ where: { tier: tierParam } })

    if (!prices) return undefined

    return tierParam
  } catch (error) {
    console.error(error)
    throw error
  }
}
