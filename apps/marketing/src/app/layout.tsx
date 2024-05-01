import type { Metadata, Viewport } from 'next'
import { Work_Sans as WorkSans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import cn from '@repo/tailwind-config/cn'
import { PostHogProvider, QueryProvider, ThemeProvider } from '@repo/web-ui/providers'
import dynamic from 'next/dynamic'
import { WhatsappButton } from '@repo/web-ui/lib'
import metadataNext from './metadata'
import viewportNext from './viewport'
import GTag from './gtag'
import MetaPixel from './meta-pixel'
import { MainLayout } from './main-layout'

const workSans = WorkSans({ subsets: ['latin'] })

export const metadata: Metadata = metadataNext

export const viewport: Viewport = viewportNext

const PostHogPageView = dynamic(async () => import('@repo/web-ui/lib/posthog-pageview'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={cn(workSans.className, 'overflow-x-hidden relative')}>
          <PostHogProvider>
            <QueryProvider>
              <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false} disableTransitionOnChange>
                <PostHogPageView />

                <MainLayout>{children}</MainLayout>

                <WhatsappButton source_from='marketing' />

                <GTag />

                <MetaPixel />
              </ThemeProvider>
            </QueryProvider>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
