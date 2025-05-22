import { auth } from '@/lib/firebase/client'
import type { NextRequest } from 'next/server'
import { adminAuth } from '@/lib/firebase/config'
import { FirebaseAuthError } from 'firebase-admin/auth'

// session expiration time in seconds
export const SESSION_EXPIRATION_TIME = 60 * 60 * 24 * 5 // 5 days for now

export type AuthUser = {
  id: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export class AuthError extends Error {
  constructor(
    message: string,
    public status: number = 401
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export const authService = {
  AuthError,

  // FIXME: This is not working as expected, can't get the current user from the auth.currentUser
  // TODO: Get the current user from the session instead of auth.currentUser
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const session = await auth.currentUser
      console.log('session', session)
      if (!session) return null

      return {
        id: session.uid,
        email: session.email,
        displayName: session.displayName,
        photoURL: session.photoURL,
      }
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  },

  // Verify the session token from cookies
  async verifySessionToken(request: NextRequest): Promise<AuthUser> {
    try {
      // Get session cookie from request
      const sessionCookie = request.cookies.get('session')?.value
      if (!sessionCookie) {
        throw new AuthError('No session cookie found')
      }

      // Verify the session cookie
      const decodedToken = await adminAuth.verifySessionCookie(
        sessionCookie,
        true
      )

      // Check if session has expired (30 days)
      const oneMonthAgo = Date.now() / 1000 - SESSION_EXPIRATION_TIME
      if (decodedToken.auth_time < oneMonthAgo) {
        throw new AuthError('Session has expired')
      }

      // Get user data from Firebase Auth
      const user = await adminAuth.getUser(decodedToken.uid)

      return {
        id: user.uid,
        email: user.email || null,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
      }
    } catch (error) {
      if (error instanceof AuthError) throw error
      // Handle FirebaseAuthError
      if (
        (error instanceof FirebaseAuthError &&
          error.code === 'auth/session-cookie-expired') ||
        (error instanceof Error && error.message === 'Session has expired')
      ) {
        throw new AuthError(error.message)
      }

      throw new AuthError('Failed to verify session', 500)
    }
  },
}
