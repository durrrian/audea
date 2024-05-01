import { prisma } from '@repo/prisma'
import cn from '@repo/tailwind-config/cn'
import { Button } from '@repo/web-ui/components'
import { ArrowLeft } from 'lucide-react'
import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { MdxComponents } from '@repo/web-ui/lib'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkUnwrapImages from 'remark-unwrap-images'
import { notFound } from 'next/navigation'

interface Prop {
  params: { articlePath: string }
}

export async function generateMetadata({ params }: Prop, parent: ResolvingMetadata): Promise<Metadata> {
  const article = await prisma.publicArticle.findUnique({ where: { path: params.articlePath } })

  const previousOgImages = (await parent).openGraph?.images ?? []

  const previousTwitterImages = (await parent).twitter?.images ?? []

  if (article) {
    const title = `Supercuan Saham — ${article.title}`

    const description = `Artikel Supercuan Saham yang berjudul: "${article.title}"`

    const articleMeta = article.metaUrl

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [{ url: articleMeta, width: 1200, height: 630 }],
      },
      twitter: {
        images: [articleMeta],
      },
    }
  }

  const title = 'Supercuan Saham — Artikel Tidak Ditemukan'

  const description = 'Artikel ini tidak ditemukan.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [...previousOgImages],
    },
    twitter: {
      images: [...previousTwitterImages],
    },
  }
}

export default async function Page({ params }: Prop) {
  const article = await prisma.publicArticle.findUnique({ where: { path: params.articlePath } })

  if (!article) return notFound()

  return (
    <main className='max-w-[1100px] mx-auto w-full space-y-10 mt-20 mb-32 px-2'>
      <Link className='w-fit h-fit' href='/article' scroll={false}>
        <Button
          className={cn(
            'w-fit h-fit flex items-center justify-center gap-2 md:text-lg text-sm md:px-2 px-1.5 md:py-1.5 py-1 bg-supercuan-primary text-supercuan-secondary hover:bg-supercuan-primary/90',
          )}
          variant='default'
          tabIndex={-1}
        >
          <ArrowLeft className='md:w-6 w-4 md:h-6 h-4' />

          <span>Kembali</span>
        </Button>
      </Link>
      <MDXRemote
        options={{
          mdxOptions: {
            remarkPlugins: [remarkUnwrapImages],
          },
        }}
        source={article.content}
        components={MdxComponents}
      />
    </main>
  )
}
