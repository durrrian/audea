import type { Membership } from '@repo/prisma/client'
import { membershipMetadata } from '~/lib/membership-metadata'

interface LessThan7DaysProps {
  membership: Membership
}

export function LessThan7Days({ membership }: LessThan7DaysProps) {
  const { isLessThan7Days, remainingDays } = membershipMetadata(membership)

  if (isLessThan7Days) {
    return (
      <p>
        Anda <strong>sudah bisa</strong> perpanjang membership.
      </p>
    )
  }

  return (
    <p>
      Note: membership hanya bisa diperpanjang H-7 sebelum masa habis, atau <strong>{remainingDays - 7}</strong> hari
      lagi.
    </p>
  )
}
