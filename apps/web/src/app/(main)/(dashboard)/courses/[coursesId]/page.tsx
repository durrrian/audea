import { prisma } from '@repo/prisma'
import { AspectRatio, Button, Separator } from '@repo/web-ui/components'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { currentProfile } from '@repo/clerk-action'
import { Pill } from '../pill'

interface PageProps {
  params: { coursesId: string }
}

export default async function Page({ params }: PageProps) {
  const user = await currentProfile()

  if (!user) return redirect('/sign-in')

  const watchedCourse = await prisma.watchCourses.findFirst({ where: { courseId: params.coursesId, userId: user.id } })

  if (!watchedCourse) {
    await prisma.watchCourses.create({ data: { courseId: params.coursesId, userId: user.id, watchedAt: new Date() } })
  } else {
    await prisma.watchCourses.update({ where: { id: watchedCourse.id }, data: { watchedAt: new Date() } })
  }

  const allCourses = await prisma.courses.findMany({ orderBy: [{ createdAt: 'asc' }] })

  const courseIndex = allCourses.findIndex((v) => v.id === params.coursesId)

  if (courseIndex === -1) return notFound()

  const course = allCourses[courseIndex]

  const isDisabledPrevious = courseIndex === 0

  const isDisabledNext = courseIndex === allCourses.length - 1

  return (
    <main className='w-full h-fit md:px-2 px-4 mt-10 mb-20 max-w-[1400px] mx-auto select-none flex flex-col gap-10'>
      <div className='w-full h-fit flex flex-col gap-2'>
        <header className='flex flex-row items-center justify-between w-full h-fit gap-4 flex-wrap'>
          <Link
            href='/courses'
            className='bg-supercuan-primary text-supercuan-secondary flex items-center w-fit h-fit px-4 py-2 rounded-lg justify-center gap-2'
          >
            <ArrowLeft /> Kembali ke Course
          </Link>

          <section className='flex flex-col gap-2 w-fit h-fit'>
            <Pill markAs={course.markAs} />

            <section className='flex flex-col gap-0'>
              <h1 className='text-xl'>{course.title}</h1>
              <h2 className='text-lg text-[#74777F]'>{course.subtitle}</h2>
            </section>
          </section>
        </header>

        <Separator />
      </div>

      <div className='w-full'>
        <AspectRatio ratio={16 / 9}>
          {/* eslint-disable-next-line jsx-a11y/iframe-has-title -- need iframe */}
          <iframe src={course.videoLink} width='100%' height='100%' allow='autoplay' />
        </AspectRatio>
      </div>

      <footer className='flex items-center justify-center w-full gap-4'>
        <Link href={isDisabledPrevious ? '#' : `/courses/${allCourses[courseIndex - 1].id}`}>
          <Button variant='outline' disabled={isDisabledPrevious}>
            <ArrowLeft className='mr-2 w-4 h-4' /> Sebelumnya
          </Button>
        </Link>

        <Link href={isDisabledNext ? '#' : `/courses/${allCourses[courseIndex + 1].id}`}>
          <Button disabled={isDisabledNext}>
            Selanjutnya <ArrowRight className='ml-2 w-4 h-4' />
          </Button>
        </Link>
      </footer>
    </main>
  )
}
