// Dynamic Route:

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// Shared function to fetch movie data
async function fetchMovieData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/movies/${id}`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour - ISR
    }
  )

  if (!res.ok) {
    return null
  }

  const movie = await res.json()

  // Check if movie exists and has required properties
  if (!movie || !movie.id || !movie.title) {
    return null
  }

  return movie
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const id = (await params).id
  const movie = await fetchMovieData(id)

  if (!movie) {
    return {
      title: 'Movie Not Found',
      description: 'The requested movie could not be found.',
    }
  }

  // Create metadata object
  return {
    title: `${movie.title}`,
    description: movie.overview || `Watch ${movie.title} on Cinemo`,
    openGraph: {
      title: movie.title,
      description: movie.overview || `Watch ${movie.title} on Cinemo`,
      images: movie.poster_path
        ? [`https://image.tmdb.org/t/p/original${movie.poster_path}`]
        : [],
      type: 'video.movie',
      releaseDate: movie.release_date,
    },
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      description: movie.overview || `Watch ${movie.title} on Cinemo`,
      images: movie.poster_path
        ? [`https://image.tmdb.org/t/p/original${movie.poster_path}`]
        : [],
    },
  }
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Since the params prop is a promise. You must use async/await or React's use function to access the values.
  const id = (await params).id
  const movie = await fetchMovieData(id)

  if (!movie) {
    notFound()
  }

  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    runtime,
    genres,
  } = movie

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section with backdrop image */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        {backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={`${title} backdrop`}
            fill
            priority
            // https://nextjs.org/docs/pages/api-reference/components/image#sizes
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              {title}
            </h1>
            <div className="flex items-center gap-4 text-white/80 mb-4">
              <span>{new Date(release_date).getFullYear()}</span>
              <span>•</span>
              <span>{runtime} min</span>
              <span>•</span>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{vote_average.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map((genre: { id: string; name: string }) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-white/20 text-white rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex-1 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="md:col-span-1">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                {poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800" />
                )}
              </div>
            </div>

            {/* Movie details */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {overview}
              </p>

              {/* Additional movie details can go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
