'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { formatDate, rupiah } from '@repo/helper'
import { Button, Input, Separator } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { useQuery } from '@tanstack/react-query'
import { useMediaQuery } from '@repo/web-ui/hooks'
import { EmitenLogo } from '~/ui/emiten-logo'
import type { DividentGroupedData, Items } from './get-dividen'
import { getDividen } from './get-dividen'

interface ClientProps {
  initialData: DividentGroupedData
}

export default function Client({ initialData }: ClientProps) {
  const { data: groupedData } = useQuery({
    queryKey: ['divident'],
    queryFn: async () => getDividen(),
    initialData,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  })

  const [searchResults, setSearchResults] = useState(groupedData)

  const [searchTerm, setSearchTerm] = useState('')

  const [monthVisibility, setMonthVisibility] = useState({} as Record<string, boolean>)

  useEffect(() => {
    const currentDate = new Date()
    const currentMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`

    setMonthVisibility({ ...monthVisibility, [currentMonth]: true })

    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need for dependencies
  }, [])

  const isMobile = useMediaQuery('(max-width: 900px)')

  return (
    <>
      <section className='mb-14 grid gap-2'>
        <header className='grid grid-cols-2 items-center gap-4'>
          <h1>Daftar Dividen Supercuan Saham</h1>

          {/* Search bar */}
          <div className='w-full h-fit flex items-center justify-end'>
            <Input
              type='search'
              placeholder='Cari kode emiten...'
              className='max-w-[300px]'
              value={searchTerm}
              onChange={(e) => {
                const text = e.target.value

                setSearchTerm(text)

                const results = Object.keys(groupedData).reduce<DividentGroupedData>((acc, monthYear) => {
                  const filteredData = Object.keys(groupedData[monthYear]).reduce<Items>((accDate, date) => {
                    const filteredTransactions = groupedData[monthYear][date].filter((item) =>
                      item.emiten.kodeEmiten.toLowerCase().includes(text.toLowerCase()),
                    )

                    if (filteredTransactions.length > 0) {
                      accDate[date] = filteredTransactions
                    }

                    return accDate
                  }, {})

                  if (Object.keys(filteredData).length > 0) {
                    acc[monthYear] = filteredData
                  }

                  return acc
                }, {})

                setSearchResults(results)
              }}
            />
          </div>
        </header>

        <Separator />
      </section>

      <section className='grid gap-10'>
        {Object.keys(searchResults).map((v) => {
          return (
            <section key={v} className='grid gap-4'>
              <Button
                className={cn(
                  'font-semibold md:text-xl text-lg w-fit h-fit flex items-center justify-center gap-2 px-2 py-1',
                )}
                onClick={() => {
                  setMonthVisibility((prevVisibility) => ({
                    ...prevVisibility,
                    [v]: !prevVisibility[v],
                  }))
                }}
              >
                {new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date(v))}
                {monthVisibility[v] ? <ChevronDown /> : <ChevronRight />}
              </Button>

              <section className='grid gap-4'>
                {monthVisibility[v] ? (
                  <section
                    className={cn(
                      'grid items-center md:text-base text-sm gap-2',
                      isMobile ? 'grid-cols-[2fr_1fr_1fr]' : 'grid-cols-[2fr_1fr_1fr_1fr_1fr]',
                    )}
                  >
                    <p className='text-center font-semibold'>Emiten</p>

                    <p className='text-center font-semibold'>Tanggal Divident</p>

                    <p className='text-center font-semibold'>Divident Per Share</p>

                    {!isMobile && <p className='text-center font-semibold'>Lot Supercuan</p>}

                    {!isMobile && <p className='text-center font-semibold'>Divident</p>}
                  </section>
                ) : null}
              </section>

              {monthVisibility[v]
                ? Object.keys(searchResults[v]).map((z) => {
                    return (
                      <section className='grid gap-6' key={z}>
                        {searchResults[v][z].map((y) => {
                          return (
                            <section
                              key={y.id}
                              className={cn(
                                'grid items-center gap-2',
                                isMobile ? 'grid-cols-[2fr_1fr_1fr]' : 'grid-cols-[2fr_1fr_1fr_1fr_1fr]',
                              )}
                            >
                              <section className='flex items-center justify-start md:gap-10 gap-2'>
                                <section className='flex items-center justify-start w-fit h-fit md:gap-4 gap-2'>
                                  <EmitenLogo kodeEmiten={y.emiten.kodeEmiten} />

                                  <section className='grid gap-0'>
                                    <p className='font-medium md:text-lg text-base'>{y.emiten.kodeEmiten}</p>
                                    <p className='font-normal md:text-sm text-xs'>
                                      {(() => {
                                        if (isMobile) {
                                          const firstSplit = y.emiten.namaPT.split('PT.')
                                          const secondSplit = firstSplit[1].split('TBK')

                                          return secondSplit[0].trim()
                                        }

                                        return y.emiten.namaPT
                                      })()}
                                    </p>
                                  </section>
                                </section>
                              </section>

                              <p className='text-center md:text-lg text-base'>
                                {isMobile ? formatDate(new Date(z), 'short') : formatDate(new Date(z), 'long')}
                              </p>

                              <p className='text-center md:text-lg text-base'>{y.dps}</p>

                              {!isMobile && <p className='text-center md:text-lg text-base'>{y.shares / 100}</p>}

                              {!isMobile && (
                                <p className='text-center md:text-lg text-base' suppressHydrationWarning>
                                  {rupiah(y.dividentNumber)}
                                </p>
                              )}
                            </section>
                          )
                        })}

                        <Separator />
                      </section>
                    )
                  })
                : null}
            </section>
          )
        })}
      </section>
    </>
  )
}
