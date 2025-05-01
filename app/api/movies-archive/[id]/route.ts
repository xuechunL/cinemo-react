import { fetchFromTMDB } from '@/lib/tmdb'
import type { TMDBMovieDetailsResponse } from '@/types/movie'
import { type NextRequest, NextResponse } from 'next/server'

// Archive route for now
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id

    if (!id) {
      return NextResponse.json(
        { error: 'Movie ID is required' },
        { status: 400 }
      )
    }

    // Fetch movie details from TMDB API
    const movie = await fetchFromTMDB<TMDBMovieDetailsResponse>(
      `/movie/${id}`,
      {
        append_to_response: 'credits,videos,similar',
      }
    )

    return NextResponse.json(movie)
  } catch (error) {
    console.error('Error fetching movie details:', error)

    // Check if it's a 404 error from TMDB
    if (error instanceof Error && error.message.includes('404')) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 })
    }

    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: 500 }
    )
  }
}
