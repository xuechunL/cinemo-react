import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const movieId = searchParams.get('id')
  const type = searchParams.get('type') || 'movie'

  if (!movieId) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${movieId}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,similar`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

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
