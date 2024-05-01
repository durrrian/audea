'use server'

import type { Prices } from '@repo/prisma/client'
import { prisma } from '@repo/prisma'

export type MembershipPrice = Prices & { ppm: number; discount: null | number }

export async function membershipPrice() {
  try {
    const allPrices = await prisma.prices.findMany({ orderBy: [{ price: 'asc' }] })

    const calculatePriceDiscount = (currentPrice: Prices, cheapestPrice: Prices) => {
      const ppmOfCheapestPrice = cheapestPrice.price / cheapestPrice.duration

      const duration = currentPrice.duration

      const cheapestPriceWithCurrentDuration = ppmOfCheapestPrice * duration

      const discount =
        ((cheapestPriceWithCurrentDuration - currentPrice.price) / cheapestPriceWithCurrentDuration) * 100

      return discount
    }

    const newPrices: MembershipPrice[] = allPrices.map((v) => {
      return {
        id: v.id,
        tier: v.tier,
        duration: v.duration,
        price: v.price,
        ppm: v.price / v.duration,
        discount: v.tier === 'BRONZE' ? null : calculatePriceDiscount(v, allPrices[0]),
      }
    })

    return newPrices
  } catch (error) {
    console.error(error)
    throw error
  }
}
