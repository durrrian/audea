'use client'

import type { Emiten, Industry, Analisis, WatchAnalisis } from '@repo/prisma/client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Input, Separator } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { useQuery } from '@tanstack/react-query'
import { useMediaQuery } from '@repo/web-ui/hooks'
import { getTextColorFromBackground } from '~/lib/get-text-color-from-background'
import { NotificationPing } from '~/ui/notification-ping'
import { getEmiten } from './get-emiten'

interface EmitenListProps {
  initialEmiten: (Emiten & { industry: Industry } & { analisis: (Analisis & { watchAnalisis: WatchAnalisis[] })[] })[]
  userId: string
}

export function EmitenList({ initialEmiten, userId }: EmitenListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const isMobile = useMediaQuery('(max-width: 768px)')

  const { data } = useQuery({
    queryKey: [`analisis-emiten-${userId}`],
    queryFn: async () => getEmiten(userId),
    initialData: initialEmiten,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  })

  const [emiten, setEmiten] = useState(data)

  useEffect(() => {
    setEmiten(data)
  }, [data])

  const handleSearch = (text: string) => {
    setSearchTerm(text)

    if (text === '') {
      setEmiten(data)
    } else {
      const filteredEmiten = data.filter((item) => item.kodeEmiten.toLowerCase().includes(text.toLowerCase()))
      setEmiten(filteredEmiten)
    }
  }

  return (
    <div className='w-full h-fit space-y-10'>
      <div className='space-y-4'>
        <header className='w-full grid md:grid-cols-2 grid-cols-1 items-center gap-4'>
          <h1 className='md:text-xl text-base md:text-left text-center'>Pilih analisis saham yang mau kamu cari tau</h1>

          {/* Search bar */}
          <div className='w-full h-fit flex items-center justify-end'>
            <Input
              type='search'
              placeholder='Cari kode emiten...'
              className='md:max-w-[300px] max-w-full'
              value={searchTerm}
              onChange={(e) => {
                handleSearch(e.target.value)
              }}
            />
          </div>
        </header>

        <Separator />
      </div>

      <section className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
        {emiten.map((v) => {
          return (
            <motion.div
              key={v.id}
              className='w-full h-full relative'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 1.08 }}
            >
              <section className='rounded-2xl shadow-lg border border-supercuan-primary cursor-pointer w-full h-full'>
                <Link href={`/analisis/${v.id}`} className='w-full h-full flex items-center justify-center gap-4 p-4'>
                  <div
                    className={cn(
                      'aspect-square rounded-full border border-supercuan-primary',
                      isMobile
                        ? 'w-[70px] h-[70px] max-w-[70px] max-h-[70px]'
                        : 'w-[100px] h-[100px] max-w-[100px] max-h-[100px]',
                    )}
                  >
                    <Image
                      src={`https://assets.stockbit.com/logos/companies/${v.kodeEmiten}.png`}
                      alt={`${v.kodeEmiten} logo`}
                      quality={100}
                      draggable={false}
                      width={isMobile ? 70 : 100}
                      height={isMobile ? 70 : 100}
                    />
                  </div>
                  <div className='md:space-y-2 space-y-1'>
                    <h5 className='xl:text-2xl md:text-xl text-lg font-semibold'>{v.kodeEmiten}</h5>
                    <h6 className='xl:text-lg md:text-base text-sm font-medium'>{v.namaPT}</h6>
                    <p
                      className={cn(
                        'xl:text-base md:text-sm text-xs font-normal rounded-md text-center w-fit h-fit px-2 py-1',
                      )}
                      style={{
                        backgroundColor: `#${v.industry.hexCode}`,
                        color: getTextColorFromBackground(v.industry.hexCode),
                      }}
                    >
                      {v.industry.name}
                    </p>
                  </div>
                </Link>
              </section>

              {!v.analisis.some((y) => y.watchAnalisis.length > 0) && <NotificationPing />}
            </motion.div>
          )
        })}
      </section>
    </div>
  )
}
