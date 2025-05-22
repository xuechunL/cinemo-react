import { type NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/config'
import { auth } from '@/lib/firebase/client'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { SESSION_EXPIRATION_TIME } from '@/lib/services/auth'

// TODO: refactor to use server action
// POST /api/auth/signin
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
    const expiresIn = SESSION_EXPIRATION_TIME * 1000
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    })

    // Set the cookie
    const response = NextResponse.json(
      {
        message: 'Successfully signed in',
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        },
      },
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
