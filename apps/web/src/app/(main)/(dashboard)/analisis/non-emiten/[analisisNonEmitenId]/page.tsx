import { notFound, redirect } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkUnwrapImages from 'remark-unwrap-images'
import { prisma } from '@repo/prisma'
import { formatDate } from '@repo/helper'
import { BookOpen } from 'lucide-react'
import { Separator } from '@repo/web-ui/components'
import { MdxComponents } from '@repo/web-ui/lib'
import { currentProfile } from '@repo/clerk-action'

interface PageProps {
  params: { analisisNonEmitenId: string }
}

export default async function Page({ params }: PageProps) {
  if (!params.analisisNonEmitenId) return notFound()

  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  const analisisNonEmitenId = params.analisisNonEmitenId

  const analisis = await prisma.analisisNonEmiten.findUnique({
    where: { id: analisisNonEmitenId },
    include: { watchAnalisisNonEmiten: { where: { userId: user.id }, take: 1 } },
  })

  if (!analisis) return notFound()

  const content = analisis.content.replace(/\\n/g, '\n')

  if (!analisis.watchAnalisisNonEmiten[0]) {
    await prisma.watchAnalisisNonEmiten.create({
      data: { analisisNonEmitenId: analisis.id, userId: user.id, watchedAt: new Date() },
    })
  } else {
    await prisma.watchAnalisisNonEmiten.update({
      where: { id: analisis.watchAnalisisNonEmiten[0].id },
      data: { watchedAt: new Date() },
    })
  }

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1100px] mx-auto gap-10 flex flex-col items-start justify-center text-justify'>
      <section className='space-y-2 w-full h-fit'>
        <header className='space-y-6'>
          <section className='space-y-2 text-left'>
            <h5 className='text-2xl font-semibold'>{analisis.title}</h5>
            <h6 className='text-lg'>{analisis.subtitle}</h6>
          </section>

          <section className='flex items-start justify-between gap-4 flex-wrap'>
            <section className='space-y-1'>
              <p className='whitespace-nowrap md:text-lg text-base font-medium'>
                {formatDate(analisis.createdDate, 'long')}
              </p>
              {analisis.updatedTime ? (
                <p className='whitespace-nowrap text-xs'>
                  Last updated: {formatDate(analisis.updatedTime, 'long', true)}
                </p>
              ) : null}
            </section>

            <p className='flex items-center justify-center w-fit h-fit gap-1 text-sm'>
              <BookOpen className='w-4 h-4' /> {analisis.minRead} menit
            </p>
          </section>
        </header>

        <Separator />
      </section>

      <section suppressHydrationWarning>
        <MDXRemote
          options={{
            mdxOptions: {
              remarkPlugins: [remarkUnwrapImages],
            },
          }}
          source={content}
          components={MdxComponents}
        />
      </section>
    </main>
  )
}
