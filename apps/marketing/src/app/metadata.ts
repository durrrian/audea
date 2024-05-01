import type { Metadata } from 'next'

const BASE_URL = 'https://supercuansaham.id'

const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: 'Supercuan Saham',

  description: 'Komunitas value investing by Alvin Tanasta.',

  generator: 'Supercuan Saham',
  applicationName: 'Supercuan Saham',
  referrer: 'origin-when-cross-origin',
  keywords: ['Supercuan Saham', 'Supercuan Saham Web', 'Supercuan Saham Web App'],
  authors: [{ name: 'Durrrian', url: 'https://durrrian.com' }],
  creator: 'Durrrian',
  publisher: 'Durrrian',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: 'Supercuan Saham',
    description: 'Komunitas value investing by Alvin Tanasta.',
    url: BASE_URL,
    siteName: 'Supercuan Saham',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Supercuan Saham',
    description: 'Komunitas value investing by Alvin Tanasta.',
    siteId: '1467726470533754880',
    creator: '@Audea_app',
    creatorId: '1467726470533754880',
    images: ['/opengraph-image.jpg'],
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

export default metadata
