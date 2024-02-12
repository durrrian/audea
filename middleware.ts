import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { db } from './utils/prisma'
import { parseUrl } from './utils/url'

export default authMiddleware({
  publicRoutes: ['/', '/login(.*)', '/signup(.*)', '/privacy-policy', '/terms-of-service', '/api/webhook(.*)'],

  async afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      try {
        const user = await db.user.findUnique({ where: { clerkUserId: auth.userId }, include: { subscription: true } })

        if (!user) return NextResponse.next()

        const subscription = user.subscription

        if (!subscription) return NextResponse.redirect(parseUrl('/not-allowed'))
      } catch (error) {
        console.error(error)
      }
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
