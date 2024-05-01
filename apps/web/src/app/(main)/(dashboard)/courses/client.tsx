'use client'

import { motion } from 'framer-motion'
import type { Courses } from '@repo/prisma/client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { formatDate } from '@repo/helper'
import { getWatchedCourses } from './get-watched-courses'
import { Pill } from './pill'
import { NewText } from './new-text'

interface ClientProps {
  initialData: (Courses & { watched: Date | null })[]
  userId: string
}

export function Client({ initialData, userId }: ClientProps) {
  const { data } = useQuery({
    queryKey: [`watchedcourses-${userId}`],
    queryFn: async () => getWatchedCourses(userId),
    initialData,
  })

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1400px] mx-auto select-none grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-6'>
      {data.map((v) => {
        return (
          <motion.section
            className='rounded-2xl shadow-lg border border-supercuan-primary cursor-pointer w-full h-full'
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1.08 }}
            key={v.id}
          >
            <Link href={`/courses/${v.id}`} className='p-4 flex flex-col gap-6'>
              <Pill markAs={v.markAs} />

              <section className='flex flex-col gap-2'>
                <h3 className='text-2xl'>{v.title}</h3>
                <p className='text-xl text-[#74777F]'>{v.subtitle}</p>
              </section>

              <section className='w-full h-fit flex items-center justify-end text-right'>
                {v.watched ? <p className='w-fit text-xs'>Dibuka: {formatDate(v.watched, 'long')}</p> : <NewText />}
              </section>
            </Link>
          </motion.section>
        )
      })}
    </main>
  )
}
