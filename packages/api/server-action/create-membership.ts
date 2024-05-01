'use server'

import type { Prices, Membership, User } from '@repo/prisma/client'
import { prisma } from '@repo/prisma'

/**
 *
 * @param price The type of Price of the membership purchased.
 * @param timeOfPurchase The time of purchase in milliseconds.
 */
export const createMembership = async (
  price: Prices,
  timeOfPurchase: number,
  user: User,
  membership: Membership | null,
) => {
  try {
    /**
     * Create the membership database for
     * the unredeemed payment
     */

    if (!membership) {
      /**
       * Membership is null
       */

      const startDate = new Date(timeOfPurchase)
      const endDate = new Date(startDate)
      endDate.setUTCMonth(startDate.getUTCMonth() + price.duration)

      const newMembership = await prisma.membership.create({
        data: { startDate, endDate, tier: price.tier, userId: user.id },
      })

      return { type: 'new-member' as const, newMembership, oldMembership: null }
    }

    /**
     * Since membership is available,
     * we need to calculate the endDate and starts from there.
     */

    if (new Date() >= new Date(membership.endDate)) {
      /**
       * Membership expired just make a new membership
       */

      const startDate = new Date(timeOfPurchase)
      const endDate = new Date(startDate)
      endDate.setMonth(startDate.getMonth() + price.duration)

      const newMembership = await prisma.membership.create({
        data: { startDate, endDate, tier: price.tier, userId: user.id },
      })

      return { type: 'look-whos-back' as const, newMembership, oldMembership: membership }
    }

    /**
     * Membership IS NOT expired.
     * Need to extend his endDate.
     */

    const startDate = new Date(membership.startDate)
    const endDate = new Date(membership.endDate)
    endDate.setMonth(endDate.getMonth() + price.duration)

    const newMembership = await prisma.membership.create({
      data: { startDate, endDate, tier: price.tier, userId: user.id },
    })

    if (membership.tier === newMembership.tier) {
      return { type: 'perpanjang' as const, newMembership, oldMembership: membership }
    }

    return { type: 'upgrading' as const, newMembership, oldMembership: membership }
  } catch (error) {
    console.error(error)
    throw error
  }
}
