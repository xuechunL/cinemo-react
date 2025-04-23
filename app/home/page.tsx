import MovieRecommendations from './movie-recommendations'

export default async function Home() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">
        Every Movie Just For You
      </h1>
      {/* Server component */}
      <MovieRecommendations />
    </div>
  )
}
