// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = ['/', '/home', '/signin', '/signup']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Get the token from the cookie
  const token = request.cookies.get('session')?.value

  if (!token) {
    console.log('Unauthorized: no token found')
    // Redirect to signin if no token
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

// Specify which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (images, e.g. for logos, icons etc.)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
