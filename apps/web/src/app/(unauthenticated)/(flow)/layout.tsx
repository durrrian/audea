import Image from 'next/image'
import Link from 'next/link'
import Logo from '@repo/assets/logo/logo.svg'
import { WhatsappButton } from '@repo/web-ui/lib'
import { Cta } from './cta'

interface UnauthenticatedLayoutProps {
  children: React.ReactNode
}

export default function UnauthenticatedLayout({ children }: UnauthenticatedLayoutProps) {
  return (
    <>
      <header
        className='w-full h-fit flex justify-between items-center max-w-screen-2xl mx-auto'
        suppressHydrationWarning
      >
        <Link href='/' className='w-fit h-fit md:px-3 px-1'>
          <Image src={Logo} alt='Supercuan Saham logo' draggable={false} quality={100} height={160} width={160} />
        </Link>

        <Cta />
      </header>

      {children}

      <WhatsappButton source_from='web' />
    </>
  )
}
