import MovieRecommendations from './movie-recommendations'

export default async function Home() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Recommendations</h1>
      {/* Server component */}
      <MovieRecommendations />
    </div>
  )
}
