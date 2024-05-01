'use client'

import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { PublicArticle } from '@repo/prisma/client'
import { formatDate } from '@repo/helper'
import { Button } from '@repo/web-ui/components'
import cn from '@repo/tailwind-config/cn'
import { useQuery } from '@tanstack/react-query'
import { HeadingWithLogo } from '~/ui/heading-with-logo'
import { getAllArticle } from '../../lib/get-all-article'

interface ArticleListProps {
  initialData: PublicArticle[]
}

export function ArticleList({ initialData }: ArticleListProps) {
  const { data: allArticle } = useQuery({
    queryKey: ['article-list'],
    initialData,
    queryFn: async () => getAllArticle(),
  })

  return (
    <section className='max-w-[1400px] px-2 mx-auto space-y-10 scroll-mt-10' id='testimonial'>
      <section className='font-bold text-center space-y-4'>
        <HeadingWithLogo>Artikel</HeadingWithLogo>
        <h4 className='lg:text-5xl md:text-4xl text-3xl text-black'>Kumpulan Artikel Supercuan Saham</h4>
      </section>

      <div className='flex flex-col items-center justify-center gap-10'>
        <section className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-fit lg:grid-rows-1 md:grid-rows-2 grid-rows-3 gap-y-4 gap-x-12'>
          {allArticle.map((v) => {
            return (
              <motion.section
                key={v.id}
                className='grid gap-8 pt-4 px-4 pb-8 rounded-2xl border border-primary shadow-lg'
                whileHover={{ scale: 1.025 }}
              >
                <div className='w-fit h-fit border border-primary rounded-xl overflow-hidden shadow-sm'>
                  <Image src={v.metaUrl} alt={`Article ${v.title} image`} width={1200} height={630} />
                </div>

                <section className='flex items-center justify-between gap-x-4'>
                  <p>{formatDate(v.createdDate, 'long')}</p>

                  <p className='flex items-center'>
                    <BookOpen className='mr-2 h-4 w-4' /> {v.minRead} menit
                  </p>
                </section>

                <Link href={`/article/${v.path}`} className='w-full h-full font-semibold text-2xl' prefetch>
                  {v.title}
                </Link>
              </motion.section>
            )
          })}
        </section>

        <Link href='/article'>
          <Button
            size='lg'
            tabIndex={-1}
            className={cn('bg-supercuan-primary text-supercuan-secondary hover:bg-supercuan-primary/90')}
          >
            Lihat Seluruh Artikel
          </Button>
        </Link>
      </div>
    </section>
  )
}
