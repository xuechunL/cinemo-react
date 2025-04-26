import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/config'
import { auth } from '@/lib/firebase/client'
import { signInWithEmailAndPassword } from 'firebase/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Sign in with Firebase client SDK
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    // Get the ID token
    const idToken = await userCredential.user.getIdToken()

    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    })

    // Set the cookie
    const response = NextResponse.json(
      { message: 'Successfully signed in' },
      { status: 200 }
    )
    response.cookies.set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    console.error('Error signing in:', error)
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    )
  }
}
