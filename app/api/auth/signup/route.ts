import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase/config'
import { auth } from '@/lib/firebase/client'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Create user with Firebase client SDK
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    // Create user document in Firestore
    await adminDb.collection('users').doc(userCredential.user.uid).set({
      email,
      name,
      createdAt: new Date().toISOString(),
    })

    // Get the ID token
    const idToken = await userCredential.user.getIdToken()

    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    })

    // Set the cookie
    const response = NextResponse.json(
      { message: 'Successfully signed up' },
      { status: 201 }
    )
    response.cookies.set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    console.error('Error signing up:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 400 }
    )
  }
}
