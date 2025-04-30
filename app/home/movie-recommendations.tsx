import { Suspense } from 'react'
import MovieGrid from '@/components/features/movie-grid'
import MovieCardSkeleton from '@/components/features/movie-grid/skeleton'
import Link from 'next/link'
import RefreshRecommendations from '@/components/features/refresh-recommendations'
import NoMovie from './no-movie'
import {
  TMDB_BASE_URL,
  getRandomEndpoint,
  removeDuplicateMovies,
} from '@/lib/tmdb'
import type { Movie } from '@/types/movie'
import { shuffleArray } from '@/utils/array'

// Server component
async function MovieRecommendationsList() {
  // Get random endpoint and query
  const { endpoint, query } = getRandomEndpoint()
  const url = `${TMDB_BASE_URL}${endpoint}?${query}`
  console.log('url', url)

  // Fetch movies from TMDB
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
    // For now, use cache: 'no-store' to ensure we get fresh data on each request
    // This is important since we're using random values in the API
    // SSR (https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering)
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const results = data.results as Movie[]
  const movies = shuffleArray(removeDuplicateMovies(results)).slice(0, 20)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <RefreshRecommendations />
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={`movie-${movie.id}`}>
              <MovieGrid movie={movie} />
            </Link>
          ))}
        </div>
      ) : (
        <NoMovie />
      )}
    </div>
  )
}

export default function MovieRecommendations() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <MovieCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      }
    >
      <MovieRecommendationsList />
    </Suspense>
  )
}
