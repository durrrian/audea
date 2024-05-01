'use client'

import type { Analisis, Emiten, WatchAnalisis } from '@repo/prisma/client'
import { formatDate } from '@repo/helper'
import { Separator } from '@repo/web-ui/components'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useMediaQuery } from '@repo/web-ui/hooks'
import { NotificationPing } from '~/ui/notification-ping'
import { analisisList } from './analisis-list'

interface ClientProps {
  initialData: Emiten & { analisis: (Analisis & { watchAnalisis: WatchAnalisis[] })[] }
  emitenId: string
  userId: string
}

export function Client({ initialData, emitenId, userId }: ClientProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { data } = useQuery({
    queryKey: [`${emitenId}-analisis-${userId}`],
    initialData,
    queryFn: async () => analisisList(emitenId, userId),
  })

  return (
    <div className='w-full h-fit p-2 space-y-8'>
      {data?.analisis.map((v) => {
        return (
          <section className='w-full h-full relative' key={v.id}>
            <Link className='space-y-4 w-full h-full' href={`/analisis/${emitenId}/${v.id}`}>
              <motion.section key={v.id} whileHover={{ scale: 1.025 }} whileTap={{ scale: 1.05 }}>
                <section className='flex items-start justify-between flex-wrap gap-4'>
                  <section className='text-left space-y-2'>
                    <h5 className='text-2xl font-semibold md:max-w-[800px] max-w-full overflow-ellipsis md:line-clamp-1 line-clamp-2'>
                      {v.title}
                    </h5>
                    {!isMobile && (
                      <h6 className='text-lg w-full max-w-[800px] max-h-[56px] line-clamp-2'>{v.subtitle}</h6>
                    )}
                  </section>
                  <section className='flex flex-col justify-start content-between w-fit h-full gap-1'>
                    <section className='space-y-1'>
                      <p className='whitespace-nowrap md:text-lg text-base font-medium'>
                        {formatDate(v.createdDate, 'long')}
                      </p>
                      {v.updatedTime && !isMobile ? (
                        <p className='whitespace-nowrap text-xs'>
                          Last updated: {formatDate(v.updatedTime, 'long', true)}
                        </p>
                      ) : null}
                    </section>
                    <p className='flex items-center justify-center w-fit h-fit gap-1 text-sm'>
                      <BookOpen className='w-4 h-4' /> {v.minRead} menit
                    </p>
                  </section>
                </section>

                {!v.watchAnalisis[0] && <NotificationPing />}
              </motion.section>
              <Separator />
            </Link>
          </section>
        )
      })}
    </div>
  )
}
