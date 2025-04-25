import Link from 'next/link'
import Image from 'next/image'

export default function MovieNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Oops, Movie Not Found!</h1>

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
        We couldn&apos;t find the movie you&apos;re looking for. It might have
        been removed or the ID might be incorrect.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
        >
          Return Home
        </Link>
        <Link
          href="/collections"
          className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Browse Collections
        </Link>
      </div>
    </div>
  )
}
