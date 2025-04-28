import Image from 'next/image'

export function EmptyPlaceholder() {
  return (
    <div className="relative w-64 h-64 mb-8">
      <Image
        src="/images/movie-not-found.svg"
        alt="Movie not found"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}
