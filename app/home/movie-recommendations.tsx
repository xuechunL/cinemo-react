import { Suspense } from 'react'

import { Movie } from '@/types/movie'
import {
  fetchDefaultRecommendations,
  fetchPersonalizedRecommendations,
} from './api/movies'
import MovieGrid from '@/components/features/movie-grid'
import MovieCardSkeleton from '@/components/features/movie-grid/skeleton'
import Link from 'next/link'

// Server component
async function MovieRecommendationsList() {
  // TODO: verify authenticated user on the server-side
  const user = {
    uid: '123',
  }

  let movies: Movie[] = []

  if (user) {
    // TODO: Get personalized recommendations for authenticated users by user id
    movies = await fetchPersonalizedRecommendations(user.uid)
  } else {
    // Fetch general recommendations for non-authenticated users
    movies = await fetchDefaultRecommendations()
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <MovieGrid movie={movie} />
        </Link>
      ))}
    </div>
  )
}

export default function MovieRecommendations() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Recommendations</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        {/* Server component */}
        <MovieRecommendationsList />
      </Suspense>
    </div>
  )
}
