import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/config'

export async function GET(request: NextRequest) {
  try {
    // check token
    const token = request.cookies.get('session')?.value

    if (!token) {
      // token not found
      return NextResponse.json({ verified: false }, { status: 401 })
    }

    // verify token
    await adminAuth.verifySessionCookie(token, true)
    return NextResponse.json({ verified: true })
  } catch (error) {
    console.error('Error verifying session cookie:', error)
    return NextResponse.json({ verified: false }, { status: 401 })
  }
}
