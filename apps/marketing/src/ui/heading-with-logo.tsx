import Image from 'next/image'
import Logo from '@repo/assets/logo/square_logo.svg'

interface HeadingWithLogoProps {
  children: React.ReactNode
}

export function HeadingWithLogo({ children }: HeadingWithLogoProps) {
  return (
    <h6 className='flex items-center justify-center text-xl gap-1 font-bold text-center select-none'>
      <Image src={Logo} alt='Supercuan Logo' width={24} height={24} draggable={false} className='select-none' />
      {children}
    </h6>
  )
}
