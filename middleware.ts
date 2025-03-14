// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// TODO: check if the user is authenticated on the server side
export function middleware(request: NextRequest) {
  console.log('middleware request: --------------------------------')
  console.log('cookies token:', request.cookies.get('token'))
  // redirect unauthenticated users from protected routes
  // TODO: make sure the token is valid in the server side
  // if (!request.cookies.get('token')) {
  // 	return NextResponse.redirect(new URL('/signin', request.url))
  // }
  return NextResponse.next()
}

// Specify which paths this middleware should run on
export const config = {
  matcher: ['/collections', '/preferences'],
}
