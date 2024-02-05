import { BASE_URL } from '@/utils/url'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/privacy-policy', '/terms-of-service', '/login'],
        disallow: ['/form/*', '/not-allowed', '/api/webhook/clerk'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
