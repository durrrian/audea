import type { MetadataRoute } from 'next'
import { prisma } from '@repo/prisma'

const baseUrl = 'https://supercuansaham.id'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesArr = ['', '/faq', '/privacy-policy', '/terms-of-service', '/article']

  const routesMap: MetadataRoute.Sitemap = routesArr.map((v) => {
    return {
      url: `${baseUrl}${v}`,
      lastModified: new Date(),
    }
  })

  let fetchedRoutes: MetadataRoute.Sitemap

  try {
    const articleList = await prisma.publicArticle.findMany({ orderBy: [{ createdDate: 'desc' }] })

    fetchedRoutes = articleList.map((article) => {
      return {
        url: `${baseUrl}/article/${article.path}`,
        lastModified: article.createdDate,
      }
    })
  } catch (error) {
    console.error(error)
    throw error
  }

  return [...routesMap, ...fetchedRoutes]
}
