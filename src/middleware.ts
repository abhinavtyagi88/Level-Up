import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// ✅ Only protect these routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)',
  '/api/auth(.*)', // protected API
  '/',             // protect home (optional — remove if public)
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn()
  }
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/forum/:path*',
    '/api/auth/:path*',
    '/', // remove if home should be public
    '/public/:path*',
  ],
}
