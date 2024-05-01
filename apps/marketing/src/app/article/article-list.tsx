'use client'

import type { PublicArticle } from '@repo/prisma/client'
import { formatDate } from '@repo/helper'
import { Separator } from '@repo/web-ui/components'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { getAllArticle } from '~/lib/get-all-article'

interface ArticleListProps {
  initialArticle: PublicArticle[]
}

export default function ArticleList({ initialArticle }: ArticleListProps) {
  const { data: allArticle } = useQuery({
    queryKey: ['article-list-page'],
    initialData: initialArticle,
    queryFn: async () => getAllArticle(),
  })

  return (
    <section className='w-full h-fit p-2 space-y-8'>
      {allArticle.map((v) => {
        return (
          <section key={v.id} className='w-full h-fit'>
            <Link className='space-y-4 w-full h-full' href={`/article/${v.path}`}>
              <motion.section key={v.id} whileHover={{ scale: 1.025 }} whileTap={{ scale: 1.05 }}>
                <section className='flex items-start justify-between flex-wrap gap-4'>
                  <section className='text-left space-y-2'>
                    <h5 className='text-2xl font-semibold md:max-w-[800px] max-w-full overflow-ellipsis md:line-clamp-1 line-clamp-2'>
                      {v.title}
                    </h5>
                  </section>

                  <section className='flex flex-col justify-start content-between w-fit h-full gap-1'>
                    <section className='space-y-1'>
                      <p className='whitespace-nowrap md:text-lg text-base font-medium'>
                        {formatDate(v.createdDate, 'long')}
                      </p>
                    </section>

                    <p className='flex items-center justify-center w-fit h-fit gap-1 text-sm'>
                      <BookOpen className='w-4 h-4' /> {v.minRead} menit
                    </p>
                  </section>
                </section>
              </motion.section>

              <Separator className='bg-gray-200' />
            </Link>
          </section>
        )
      })}
    </section>
  )
}
