import type { Metadata } from 'next'
import { getAllArticle } from '~/lib/get-all-article'
import ArticleList from './article-list'

export const metadata: Metadata = {
  title: 'Supercuan Saham — Artikel',
}

export default async function Page() {
  const allArticle = await getAllArticle()

  return (
    <main className='max-w-[1100px] mx-auto w-full space-y-10 mt-20 mb-32 px-2'>
      <header className='space-y-4'>
        <h1 className='text-4xl font-medium text-left'>Articles</h1>
        <h2 className='text-xl text-left font-light'>Kumpulan artikel yang ditulis oleh Supercuan Saham</h2>
      </header>

      <ArticleList initialArticle={allArticle} />
    </main>
  )
}
