import Header from '@/components/features/layout/header'

import MovieRecommendations from './movie-recommendations'
import { fetchDefaultRecommendations } from './api/movies'

export default async function Home() {
  // TODO: verify authenticated user server-side
  // TODO: fetch personalized recommendations by user id

  // Fetch default recommendations as fallback
  const defaultMovies = await fetchDefaultRecommendations()

  return (
    <main>
      <Header />
      <MovieRecommendations initialMovies={defaultMovies} />
    </main>
  )
}
