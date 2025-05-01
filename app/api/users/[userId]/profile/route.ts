import { type NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase/config'
import type { UserPreferences } from '@/types/user'

// GET /api/users/:userId/profile
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId

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
    if (decodedToken.uid !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized: cannot access other user preferences' },
        { status: 403 }
      )
    }

    // Get user profile from Firestore
    const userDoc = await adminDb.collection('users').doc(userId).get()
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

// PATCH /api/users/:userId/profile
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId
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
    if (decodedToken.uid !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized: cannot update other user preferences' },
        { status: 403 }
      )
    }

    // Get and validate request body
    const preferences: UserPreferences = await request.json()

    // Update user preferences in Firestore
    await adminDb
      .collection('users')
      .doc(userId)
      .update({
        preferences: {
          ...preferences,
          lastUpdated: new Date().toISOString(),
        },
      })

    // Get updated user document
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const userData = userDoc.data()

    return NextResponse.json({
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
