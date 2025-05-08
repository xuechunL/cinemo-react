import { type NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase/config'
import type { UserProfile } from '@/types/user'

// GET /api/user/profile
export async function GET(request: NextRequest) {
  try {
    // Verify session
    const token = request.cookies.get('session')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: no session token found' },
        { status: 401 }
      )
    }

    // Verify token and get user ID
    const decodedToken = await adminAuth.verifySessionCookie(token, true)

    // Check if session has expired
    if (decodedToken.auth_time < Date.now() / 1000 - 60 * 60 * 24 * 30) {
      return NextResponse.json(
        { error: 'Unauthorized: session expired' },
        { status: 401 }
      )
    }

    // if (decodedToken.uid !== userId) {
    //   return NextResponse.json(
    //     { error: 'Forbidden: cannot access other user preferences' },
    //     { status: 403 }
    //   )
    // }

    // Get user profile from Firestore
    const userDoc = await adminDb
      .collection('users')
      .doc(decodedToken.uid)
      .get()
    const userData = userDoc.data()

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error('Error fetching profile:', error)
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
    const token = request.cookies.get('session')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: no session token found' },
        { status: 401 }
      )
    }

    // Verify token and get user ID
    const decodedToken = await adminAuth.verifySessionCookie(token, true)
    // Check if session has expired
    if (decodedToken.auth_time < Date.now() / 1000 - 60 * 60 * 24 * 30) {
      return NextResponse.json(
        { error: 'Unauthorized: session expired' },
        { status: 401 }
      )
    }
    // Get and validate request body
    const profile: Partial<UserProfile> = await request.json()
    const userId = profile.uid

    if (decodedToken.uid !== userId) {
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
