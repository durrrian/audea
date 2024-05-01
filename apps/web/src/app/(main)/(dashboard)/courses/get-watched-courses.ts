'use server'

import { prisma } from '@repo/prisma'

export async function getWatchedCourses(userId: string) {
  try {
    const watchCourses = await prisma.watchCourses.findMany({ where: { userId } })

    const allCourses = await prisma.courses.findMany({ orderBy: [{ createdAt: 'asc' }] })

    const watchedCourses = allCourses.map((v) => {
      const findWatchedCourses = watchCourses.find((w) => w.courseId === v.id)

      return {
        ...v,
        watched: findWatchedCourses ? findWatchedCourses.watchedAt : null,
      }
    })

    return watchedCourses
  } catch (error) {
    console.error(error)
    throw error
  }
}
