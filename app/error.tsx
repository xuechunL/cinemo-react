'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { EmptyPlaceholder } from '@/components/ui/empty-placeholder'
// https://nextjs.org/docs/app/getting-started/error-handling#nested-error-boundaries
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>

      {/* TODO: replace with a more specific error image */}
      <EmptyPlaceholder />

      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        {error.message}
      </p>

      <button
        type="button"
        className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
