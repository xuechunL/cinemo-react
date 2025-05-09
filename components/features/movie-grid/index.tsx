// components/movie/MovieGrid.tsx
import Image from 'next/image'
import type { Movie } from '@/types/movie'

type MovieGridProps = {
  movie: Movie
}

export default function MovieGrid({ movie }: MovieGridProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-transform hover:scale-105">
      {movie.poster_path ? (
        <div className="relative aspect-[2/3] mb-3">
          {/* Responsive image using Next.js Image component */}
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md object-cover"
          />
        </div>
      ) : (
        <div className="relative aspect-[2/3] mb-3">
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>
      )}
      <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
        {movie.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {movie.overview}
      </p>
    </div>
  )
}
