import { type NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase/config'
import type { UserProfile } from '@/types/user'
import { authService, AuthError } from '@/lib/services/auth'

// GET /api/user/profile
export async function GET(request: NextRequest) {
  try {
    const user = await authService.verifySessionToken(request)
    console.log('user', user)
    // Get user profile from Firestore
    const userDoc = await adminDb.collection('users').doc(user.id).get()
    const userData = userDoc.data()

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error('API Error:', error)
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

// PATCH /api/user/profile
export async function PATCH(request: NextRequest) {
  try {
    // Verify session
    //
    const user = await authService.verifySessionToken(request)

    // Get and validate request body
    const profile: Partial<UserProfile> = await request.json()
    const userId = profile.uid

    if (user.id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden: cannot update other user preferences' },
        { status: 403 }
      )
    }

    // Update user preferences in Firestore
    await adminDb
      .collection('users')
      .doc(userId)
      .update({
        preferences: {
          ...profile.preferences,
          lastUpdated: new Date().toISOString(),
        },
      })

    // Get updated user document
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const userData = userDoc.data()

    return NextResponse.json({
      message: 'Preferences updated successfully',
      uid: userId,
      preferences: userData?.preferences || {},
    })
  } catch (error) {
    console.error('Error updating preferences:', error)
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}
