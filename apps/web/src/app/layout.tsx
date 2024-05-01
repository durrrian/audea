import type { Metadata, Viewport } from 'next'
import { Work_Sans as WorkSans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import cn from '@repo/tailwind-config/cn'
import { Toaster } from '@repo/web-ui/components'
import { PostHogProvider, QueryProvider, ThemeProvider } from '@repo/web-ui/providers'
import dynamic from 'next/dynamic'
import { TriggerProvider } from '@trigger.dev/react'
import { SidebarProvider } from '~/providers/sidebar-provider'
import { TidioProvider } from '~/providers/tidio-provider'
import GTag from './gtag'
import { metadata as metadataNext } from './metadata'
import { viewport as viewportNext } from './viewport'
import { MetaPixel } from './meta-pixel'
import { InjectManifest } from './inject-manifest'

const workSans = WorkSans({ subsets: ['latin'] })

export const metadata: Metadata = metadataNext

export const viewport: Viewport = viewportNext

const PostHogPageView = dynamic(async () => import('@repo/web-ui/lib/posthog-pageview'), {
  ssr: false,
})

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <ClerkProvider>
      <html lang='id' suppressHydrationWarning suppressContentEditableWarning>
        <body className={cn(workSans.className, 'overflow-x-hidden relative')}>
          <TriggerProvider publicApiKey={String(process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY)}>
            <PostHogProvider>
              <QueryProvider>
                <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false} disableTransitionOnChange>
                  <SidebarProvider>
                    <TidioProvider>
                      <PostHogPageView />

                      {children}

                      <Toaster />

                      <GTag />

                      <MetaPixel />

                      <InjectManifest />
                    </TidioProvider>
                  </SidebarProvider>
                </ThemeProvider>
              </QueryProvider>
            </PostHogProvider>
          </TriggerProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
