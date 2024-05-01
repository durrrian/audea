/**
 * This is the promo logic
 *
 * Promo code should have at least 2 properties:
 * 1. The code (chould be mix with number and alphabet, but no special characters)
 * 2. Whether its for 'NEW' member or 'OLD' member (OLD member means perpanjang membership)
 */

import type { Prices } from '@repo/prisma/client'
import type { CurrentProfile } from '@repo/clerk-action'

export type PromoData = {
  price: Prices
  isPromoValid: boolean
  message: string | null
}

export function promoLogic(code: string | null, oldPrice: Prices, user: CurrentProfile): PromoData {
  if (code === 'DURRRIANXSUPERCUAN') {
    /**
     * Diskon 20% untuk semua tier buat member baru
     */

    if (user.membership !== null) {
      return { price: oldPrice, isPromoValid: false, message: 'Promo ini hanya berlaku untuk member baru' }
    }

    return {
      price: {
        ...oldPrice,
        price: 0,
      },
      isPromoValid: true,
      message: `Kode promo ${code} berhasil diterapkan.`,
    }
  }

  return {
    price: oldPrice,
    isPromoValid: false,
    message: code === null ? null : 'Kode promo tidak valid. Harga tercantum adalah harga normal.',
  }
}
