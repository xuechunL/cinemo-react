import { Suspense } from 'react'
import MovieGrid from '@/components/features/movie-grid'
import MovieCardSkeleton from '@/components/features/movie-grid/skeleton'
import Link from 'next/link'
import { Movie } from '@/types/movie'

// Server component
async function MovieRecommendationsList() {
  // Fetch recommendations from the API route (via GET request),
  // the server will fetch the recommendations based on the user's id
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/movies/recommendations`,
    {
      // Use cache: 'no-store' to ensure we get fresh data on each request
      // This is important since we're using random values in the API
      cache: 'no-store',
    }
  )

  // TODO: handle error properly
  if (!response.ok) {
    throw new Error('Failed to fetch movie recommendations')
  }

  const data = await response.json()
  const movies = data.movies as Movie[]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={`movie-${movie.id}`}>
          <MovieGrid movie={movie} />
        </Link>
      ))}
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
