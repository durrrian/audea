import type { Metadata } from 'next'
import './globals.css'
import { TTInterfaces } from '@/font'
import meta from './meta'
import { Toaster } from '@/components'
import { ThemeProvider } from '@/provider/theme-provider'
import { ViewportProvider } from '@/provider/viewport-provider'
import GTag from './gtag'
import { AudioPolyfill } from './audio-polyfill'
import { QueryProvider } from '@/provider/query-provider'

export const metadata: Metadata = meta

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={TTInterfaces.className}>
        <QueryProvider>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
            <ViewportProvider>
              {children}

              <Toaster />

              <AudioPolyfill />
            </ViewportProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>

      <GTag />
    </html>
  )
}
