// API implementation for interacting with TMDB APIs about movies
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.url

  if (!url) {
    return NextResponse.json({ error: 'Url is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error('TMDB API request failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('TMDB API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch movie data' },
      { status: 500 }
    )
  }
}
