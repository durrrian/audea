import { BASE_URL } from '@/utils/url'
import { Metadata } from 'next'

const meta: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: 'Audea',

  description: 'Transform your messy thoughts into structured notes.',

  generator: 'Audea',
  applicationName: 'Audea',
  referrer: 'origin-when-cross-origin',
  keywords: ['Audea', 'Audea Landing Page', 'Audea Landing Page'],
  authors: [{ name: 'Durrrian', url: 'https://durrrian.com' }],
  creator: 'Durrrian',
  publisher: 'Durrrian',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: 'Audea',
    description: 'Transform your messy thoughts into structured notes.',
    url: '/',
    siteName: 'Audea',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Audea',
    description: 'Transform your messy thoughts into structured notes.',
    siteId: '1467726470533754880',
    creator: '@Audea_app',
    creatorId: '1467726470533754880',
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/180x180.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/180x180.png',
    },
  },
}

export default meta
