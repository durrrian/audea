import Image from 'next/image'

interface EmitenLogoProps {
  kodeEmiten: string
  size?: number
}

export function EmitenLogo({ kodeEmiten, size = 40 }: EmitenLogoProps) {
  return (
    <Image
      src={`https://assets.stockbit.com/logos/companies/${kodeEmiten}.png`}
      alt={`${kodeEmiten} logo`}
      height={size}
      width={size}
      draggable={false}
      quality={100}
    />
  )
}
