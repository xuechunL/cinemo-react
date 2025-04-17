import { Suspense } from 'react'

import { Movie } from '@/types/movie'
import { fetchDefaultRecommendations } from './api/movies'
import MovieGrid from '@/components/features/movie-grid'
import MovieCardSkeleton from '@/components/features/movie-grid/skeleton'

// FIXME: getAuthenticatedUser is not working
function getAuthenticatedUser() {
  return null
}

async function MovieRecommendationsList() {
  // TODO: verify authenticated user on the server-side
  const user = getAuthenticatedUser()
  let movies: Movie[] = []

  if (user) {
    // TODO: Get personalized recommendations for authenticated users by user id
    // movies = await fetchPersonalizedRecommendations(user.uid)
  } else {
    // Fetch general recommendations for non-authenticated users
    // You might want to implement this function in your API
    movies = await fetchDefaultRecommendations()
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieGrid key={movie.id} movie={movie} />
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
        <MovieRecommendationsList />
      </Suspense>
    </div>
  )
}
