// Dynamic Route:

import { MovieCard } from '@/components/features/movie-card'

// TODO: get movie details by movieId from TMDB API in server component (Dynamic Route)
export default async function MovieDetails({
  params,
}: {
  params: { id: string }
}) {
  console.log(params)
  return (
    <div>
      <MovieCard
        id={params.id}
        title="Stranger Things"
        image="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        rating={7.5}
      />
    </div>
  )
}
