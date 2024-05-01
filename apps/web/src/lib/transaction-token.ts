'use server'

import type { CurrentProfile } from '@repo/clerk-action'
import { midtransSnap, promoLogic } from '@repo/api'
import type { Prices } from '@repo/prisma/client'

export async function transactionToken(price: Prices, promoCode: string | null, user: CurrentProfile) {
  try {
    const promoData = promoLogic(promoCode, price, user)

    const nameArr = user.name.split(' ')
    const nameArrLength = nameArr.length

    const firstName = nameArr[0]
    const lastName = nameArrLength > 1 ? nameArr[nameArrLength - 1] : ''

    const midtransData = {
      transaction_details: {
        order_id: `ss-${user.id}-${Math.round(new Date().getTime() / 1000)}-${price.tier}`,
        gross_amount: promoData.price.price,
      },
      credit_card: {
        secure: true,
      },
      item_details: [
        {
          id: price.id,
          price: price.price,
          name: `Supercuan Saham ${price.tier}.`,
          quantity: 1,
        },
      ],
      customer_details: {
        first_name: firstName,
        last_name: lastName,
        email: user.email,
      },
    }

    const token = await midtransSnap.createTransactionToken(midtransData)

    return { token, promoData }
  } catch (error) {
    console.error(error)
    throw error
  }
}
