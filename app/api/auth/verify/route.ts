import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/config'

export async function GET(request: NextRequest) {
  try {
    // check token
    const token = request.cookies.get('session')?.value

    if (!token) {
      // No token found
      return NextResponse.json(
        { verified: false, error: 'No session token found' },
        { status: 401 }
      )
    }

    // verify token
    const decodedToken = await adminAuth.verifySessionCookie(token, true)

    // Add additional security checks
    if (decodedToken.auth_time < Date.now() / 1000 - 60 * 60 * 24 * 30) {
      return NextResponse.json(
        { verified: false, error: 'Session expired' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      verified: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        // Add other user data as needed
      },
    })
  } catch (error) {
    console.error('Error verifying session cookie:', error)
    return NextResponse.json(
      { verified: false, error: 'Invalid session token' },
      { status: 401 }
    )
  }
}
