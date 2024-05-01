'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button, Input, Separator } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { formatDate } from '@repo/helper'
import { useQuery } from '@tanstack/react-query'
import { useMediaQuery } from '@repo/web-ui/hooks'
import { EmitenLogo } from '~/ui/emiten-logo'
import type { Items, TransactionGroupedData } from './get-transaction'
import { getTransaction } from './get-transaction'

interface ClientProps {
  initialData: TransactionGroupedData
  initialSearchTerm: string | undefined
}

export default function Client({ initialData, initialSearchTerm }: ClientProps) {
  const { data: groupedData } = useQuery({
    queryKey: ['transaction'],
    queryFn: async () => getTransaction(),
    initialData,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  })

  const [searchResults, setSearchResults] = useState(
    initialSearchTerm
      ? () => {
          const results = Object.keys(groupedData).reduce<TransactionGroupedData>((acc, monthYear) => {
            const filteredData = Object.keys(groupedData[monthYear]).reduce<Items>((accDate, date) => {
              const filteredTransactions = groupedData[monthYear][date].filter((item) =>
                item.emiten.kodeEmiten.toLowerCase().includes(initialSearchTerm.toLowerCase()),
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

          return results
        }
      : groupedData,
  )

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? '')

  const [monthVisibility, setMonthVisibility] = useState({} as Record<string, boolean>)

  useEffect(() => {
    const currentDate = new Date()
    const currentMonth = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`

    setMonthVisibility({ ...monthVisibility, [currentMonth]: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need
  }, [])

  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <>
      <section className='mb-14 grid gap-2'>
        <header className='grid grid-cols-2 items-center gap-4'>
          <h1>Daftar Transaksi Supercuan Saham</h1>

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

                const results = Object.keys(groupedData).reduce<TransactionGroupedData>((acc, monthYear) => {
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

              {monthVisibility[v]
                ? Object.keys(searchResults[v]).map((z) => {
                    const date = new Date(z)
                    const date18Oct = new Date('18/10/2023')

                    const day = date.getDate() === date18Oct.getDate()
                    const month = date.getMonth() === date18Oct.getMonth()

                    const isSame = day && month

                    return (
                      <section key={z} className='grid gap-4'>
                        <section className='grid grid-cols-[6fr_1fr_1fr] items-center md:text-base text-sm gap-2'>
                          <h6 className='font-medium'>
                            {isSame ? '01 January 2023 - 18 October 2023' : formatDate(date, 'long')}
                          </h6>

                          <p className='text-center'>
                            Jumlah <span className='md:text-base text-xs'>(lot)</span>
                          </p>

                          <p className='text-center'>Harga</p>
                        </section>

                        <section className='grid gap-6'>
                          {searchResults[v][z].map((y) => {
                            return (
                              <section key={y.id} className='grid grid-cols-[6fr_1fr_1fr] items-center gap-2'>
                                <section className='flex items-center justify-start md:gap-10 gap-2'>
                                  {(() => {
                                    if (y.type === 'BUY') {
                                      return (
                                        <div className='bg-[#4ADE80] text-supercuan-primary px-2 py-1 rounded-md w-fit h-fit md:text-base text-xs'>
                                          Buy
                                        </div>
                                      )
                                    }

                                    return (
                                      <div className='bg-supercuan-error text-supercuan-secondary px-2 py-1 rounded-md w-fit h-fit md:text-base text-xs'>
                                        Sell
                                      </div>
                                    )
                                  })()}

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

                                <p className='text-center md:text-xl text-base'>{y.lot}</p>

                                <p className='text-center md:text-xl text-base'>{y.price}</p>
                              </section>
                            )
                          })}

                          <Separator />
                        </section>
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
