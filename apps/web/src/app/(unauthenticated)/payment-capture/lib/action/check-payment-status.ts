'use server'

import { midtrans } from '@repo/api'

export async function checkPaymentStatus(orderId: string) {
  try {
    const response = await midtrans.transaction.status(orderId)

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
