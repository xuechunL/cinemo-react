// API implementation for interacting with TMDB APIs about movies

import { NextResponse } from 'next/server'

type GetRequest = {
  url: string
  // TODO: Add query params to the request, e.g. ?page=1&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=28&with_watch_monetization_types=flatrate
  options?: {
    queryParams?: Record<string, string>
  }
}

const baseUrl = 'https://api.themoviedb.org/3'

export async function GET({ url }: GetRequest) {
  if (!url) {
    return NextResponse.json({ error: 'Url is required' }, { status: 400 })
  }

  try {
    const response = await fetch(`${baseUrl}/${url}`, {
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
