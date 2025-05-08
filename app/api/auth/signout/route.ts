import { NextResponse } from 'next/server'
import { auth } from '@/lib/firebase/client'
import { signOut } from 'firebase/auth'

// TODO: refactor to use server action

export async function POST() {
  try {
    // Sign out from Firebase
    await signOut(auth)

    // Clear the session cookie
    const response = NextResponse.json(
      { message: 'Successfully signed out' },
      { status: 200 }
    )
    response.cookies.delete('session')

    return response
  } catch (error) {
    console.error('Error signing out:', error)
    return NextResponse.json({ error: 'Failed to sign out' }, { status: 500 })
  }
}
