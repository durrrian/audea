'use server'

import { prisma } from '@repo/prisma'

export async function getAllArticle() {
  try {
    const allArticle = await prisma.publicArticle.findMany({ orderBy: [{ createdDate: 'desc' }] })

    return allArticle
  } catch (error) {
    console.error(error)
    throw error
  }
}
