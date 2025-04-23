import Link from 'next/link'
import Image from 'next/image'

export default function NoMovie() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Oops, Nothing Here Yet!</h1>

      <div className="relative w-64 h-64 mb-8">
        <Image
          src="/images/movie-not-found.svg"
          alt="Movie not found"
          fill
          className="object-contain"
          priority
        />
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Please keep exploring and find your favorite movie.
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}
