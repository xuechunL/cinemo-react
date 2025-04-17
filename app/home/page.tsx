import Header from '@/components/features/layout/header'
import MovieRecommendations from './movie-recommendations'

export default async function Home() {
  return (
    <main>
      {/* Client component */}
      <Header />
      {/* Server component */}
      <MovieRecommendations />
    </main>
  )
}
