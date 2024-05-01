import type { Membership } from '@repo/prisma/client'

export const membershipMetadata = (membership: Membership) => {
  const now = new Date()

  const endDate = new Date(membership.endDate)

  const isLessThan1Month = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) <= 31
  const isLessThan7Days = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) <= 7

  const startDate = new Date(membership.startDate)

  const remainingTime = isLessThan1Month
    ? Math.floor((endDate.getTime() - now.getTime()) / 1000)
    : Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30))

  const totalDuration = isLessThan1Month
    ? Math.floor((endDate.getTime() - startDate.getTime()) / 1000)
    : Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))

  const remainingDays = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const remainingMonths = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30))

  return {
    isLessThan1Month,
    isLessThan7Days,
    remainingDays,
    remainingMonths,
    endDate,
    startDate,
    now,
    remainingTime,
    totalDuration,
  }
}
