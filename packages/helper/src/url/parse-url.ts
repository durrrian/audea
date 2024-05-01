import type { Location } from '@repo/api'

type SearchParam = {
  utm_source?: Location | undefined
  redirect_url?: string | undefined
  [key: string]: string | undefined
}

type urlType = 'web' | 'ads' | 'marketing' | 'webhook' | 'telegram' | 'admin'

type ParseUrl = (type: urlType, endpoint: string, searchParam?: SearchParam) => URL

export const parseUrl: ParseUrl = (type, endpoint, searchParam) => {
  const base = (() => {
    if (type === 'ads') return process.env.NEXT_PUBLIC_ADS_URL

    if (type === 'marketing') return process.env.NEXT_PUBLIC_MARKETING_URL

    if (type === 'webhook') return process.env.NEXT_PUBLIC_WEBHOOK_URL

    if (type === 'telegram') return process.env.NEXT_PUBLIC_TELEGRAM_URL

    if (type === 'admin') return process.env.NEXT_PUBLIC_ADMIN_URL

    return process.env.NEXT_PUBLIC_WEB_URL
  })()

  const url = new URL(endpoint, base)

  if (searchParam) {
    Object.keys(searchParam).forEach((key) => {
      if (key in searchParam) {
        url.searchParams.append(key, String(searchParam[key]))
      }
    })
  }

  return url
}
