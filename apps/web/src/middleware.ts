import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { parseUrl } from '@repo/helper'
import { NextResponse } from 'next/server'
import type { CurrentProfile } from '@repo/clerk-action'
import { customFetch } from '~/lib/custom-fetch'

export default authMiddleware({
  publicRoutes: [
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/check-user',
    '/sso-callback',
    '/pick-membership',
    '/payment-capture(.*)',
    '/settings/membership(.*)',
    '/pay',
    '/api/trigger',
  ],

  async afterAuth(auth, req) {
    if (auth.userId && !auth.isPublicRoute) {
      try {
        const user = (await customFetch('/api/get-user', {
          method: 'POST',
          body: JSON.stringify({ clerkUserId: auth.userId }),
        })) as CurrentProfile | null

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- clerk redirect
        if (!user) return redirectToSignIn({ returnBackUrl: req.url })

        const subscription = user.membership

        if (!subscription) {
          return NextResponse.redirect(parseUrl('web', '/pick-membership').href)
        }

        const endDate = subscription.endDate

        if (new Date() >= new Date(endDate)) {
          return NextResponse.redirect(parseUrl('web', '/settings/membership').href)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (!auth.userId && !auth.isPublicRoute) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- clerk redirect
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
