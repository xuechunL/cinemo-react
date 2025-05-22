// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = ['/', '/home', '/signin', '/signup']

// Redirect to signin and add the current path to the redirect URL
function redirectToSignin(request: NextRequest) {
  const signinUrl = new URL('/signin', request.url)
  signinUrl.searchParams.set('from', request.nextUrl.pathname)

  return NextResponse.redirect(signinUrl)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes to be accessed without authentication
  if (publicRoutes.includes(pathname)) {
    // pass through to the next middleware
    return NextResponse.next()
  }

  // Get the token from the cookie
  const token = request.cookies.get('session')?.value

  if (!token) {
    console.log('Unauthorized: no token found')
    return redirectToSignin(request)
  }

  //   // Tricky to verify the token using the API endpoint
  //   // because middleware is not allowed to use Firebase Admin SDK to verify the token
  //   // so we need to use the cookie from the request
  //   // TODO: Find a better way to verify the token
  // try {
  //   const verifyResponse = await fetch(
  //     new URL('/api/auth/verify', request.url),
  //     {
  //       headers: {
  //         // use the same cookie name as the one used in the session cookie to verify by the server
  //         cookie: `session=${token}`,
  //       },
  //     }
  //   )

  //   if (!verifyResponse.ok) {
  //     // Redirect to signin if token is invalid
  //     // console.log('Unauthorized: token is invalid', verifyResponse)
  //     return redirectToSignin(request)
  //   }
  // } catch (error) {
  //   console.error('Error verifying token:', error)
  //   // Redirect to signin if verification fails
  //   return redirectToSignin(request)
  // }

  return NextResponse.next()
}

// Specify which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (images, e.g. for logos, icons etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
