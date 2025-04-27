import Image from 'next/image'

export default function NoMovie() {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
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
        Failed to fetch movie recommendations. Please try again later.
      </p>
    </div>
  )
}
