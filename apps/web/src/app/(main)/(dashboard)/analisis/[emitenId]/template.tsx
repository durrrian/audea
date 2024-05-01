'use client'

import { usePathname } from 'next/navigation'
import { Bottombar } from './bottom-bar'
import { Topbar } from './top-bar'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const pathnameArr = pathname.split('/')

  const emitenId = pathnameArr[2]

  return (
    <>
      <Topbar emitenId={emitenId} />

      {children}

      <Bottombar emitenId={emitenId} />
    </>
  )
}
