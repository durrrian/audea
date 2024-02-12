'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  size?: number
  href?: string
}

export function Logo({ size = 22, href = '/' }: Props) {
  const { theme } = useTheme()

  return (
    <Link href={href}>
      <Image
        src={theme === 'dark' ? '/primary_logo.svg' : '/secondary_logo.svg'}
        alt='Audea logo'
        draggable={false}
        quality={100}
        height={size}
        width={size}
      />
    </Link>
  )
}
