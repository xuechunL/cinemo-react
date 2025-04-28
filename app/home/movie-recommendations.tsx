import { Suspense } from 'react'
import MovieGrid from '@/components/features/movie-grid'
import MovieCardSkeleton from '@/components/features/movie-grid/skeleton'
import Link from 'next/link'
import { Movie } from '@/types/movie'
import RefreshRecommendations from '@/components/features/refresh-recommendations'
import NoMovie from './no-movie'

// Server component
async function MovieRecommendationsList() {
  // Fetch recommendations from the API route (via Next.js GET request),
  // the server will fetch the recommendations based on the user's preferences
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/movies/recommendations`,
    {
      // For now, use cache: 'no-store' to ensure we get fresh data on each request
      // This is important since we're using random values in the API
      // SSR (https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering)
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movie recommendations.')
  }

  const data = await response.json()
  const movies = data.movies as Movie[]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        {/* Client component to refresh recommendations */}
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
      {/* Server component */}
      <MovieRecommendationsList />
    </Suspense>
  )
}
