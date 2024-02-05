import { BASE_URL } from '@/utils/url'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesArr = ['', '/login', '/privacy-policy', '/terms-of-service']

  const routesMap: MetadataRoute.Sitemap = routesArr.map((v) => {
    return {
      url: `${BASE_URL}${v}`,
      lastModified: new Date(),
    }
  })

  return routesMap
}
