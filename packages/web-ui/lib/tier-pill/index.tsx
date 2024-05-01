import type { Prices } from '@repo/prisma/client'
import style from './index.module.css'
import cn from '@repo/tailwind-config/cn'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  tier: Prices['tier']
}

export const renderTier = (tier: Prices['tier']) => {
  if (tier === 'BRONZE') return style.bronze
  else if (tier === 'SILVER') return style.silver
  else if (tier === 'GOLD') return style.gold
  else if (tier === 'PLATINUM') return style.platinum
  else return null
}

export function TierPill({ tier, className, ...props }: Props) {
  return (
    <p className={cn(renderTier(tier), 'px-4 py-1 rounded-3xl text-supercuan-secondary', className)} {...props}>
      {/* {children} */}
      {tier[0].toUpperCase()}
      {tier.slice(1).toLowerCase()}
    </p>
  )
}
