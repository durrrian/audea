'use client'

import Image from 'next/image'
import cn from '@repo/tailwind-config/cn'
import { rupiah } from '@repo/helper'
import { useMediaQuery } from '@repo/web-ui/hooks'
import TextDisplay from './text-display'
import type { TextDisplayProps } from './text-display'

interface TopGainerLoserProps extends TextDisplayProps {
  tableHeader: [string, string, string, string]
  data: { Emiten: string; 'Ptsl (+/-)': number; 'Ptsl (+/-) %': number; 'Last Price': number }[]
}

export function TopGainerLoser({ title, subtitle, tableHeader, data }: TopGainerLoserProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <TextDisplay title={title} subtitle={subtitle}>
      <section className='grid w-full gap-1'>
        <section
          className={cn(
            'text-supercuan-greyPrimary grid items-center text-xs md:text-base',
            isMobile ? 'grid-cols-[2fr_2fr_1fr]' : 'grid-cols-[2fr_2fr_1fr_1fr]',
          )}
        >
          {tableHeader.map((v, i) => {
            if (isMobile && i === 3) {
              return null
            }

            return (
              <p key={v} className={(isMobile && i === 2) || i === 3 ? 'text-right' : 'text-left'}>
                {v}
              </p>
            )
          })}
        </section>

        {data.map((v) => {
          return (
            <section
              key={v.Emiten}
              className={cn(
                'grid  items-center text-sm md:text-xl',
                isMobile ? 'grid-cols-[2fr_2fr_1fr]' : 'grid-cols-[2fr_2fr_1fr_1fr]',
              )}
            >
              <section className='flex items-center justify-start gap-2'>
                <Image
                  src={`https://assets.stockbit.com/logos/companies/${v.Emiten}.png`}
                  alt={`${v.Emiten} logo`}
                  quality={100}
                  draggable={false}
                  width={!isMobile ? 40 : 20}
                  height={!isMobile ? 40 : 20}
                />
                <p>{v.Emiten}</p>
              </section>

              <p>{rupiah(v['Ptsl (+/-)']).split(',')[0]}</p>

              <p
                className={cn(
                  v['Ptsl (+/-) %'] > 0 ? 'text-green-600' : 'text-red-600',
                  isMobile ? 'text-right' : 'text-left',
                )}
              >
                {(v['Ptsl (+/-) %'] * 100).toFixed(2)}%
              </p>

              {!isMobile && <p className='text-right'>{v['Last Price']}</p>}
            </section>
          )
        })}
      </section>
    </TextDisplay>
  )
}
