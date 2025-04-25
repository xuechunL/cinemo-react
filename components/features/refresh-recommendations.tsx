'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RefreshRecommendations() {
  const router = useRouter()

  // Force a refresh of the current route
  const handleRefresh = () => {
    // The router.refresh() call will trigger a re-fetch of the server component
    // Since we're using cache: 'no-store', this will get fresh recommendations from the API
    // The UI will update with new recommendations
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleRefresh}
      className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
    >
      <Image
        src="/refresh.svg"
        alt="Refresh"
        width={20}
        height={20}
        className="invert-0 dark:invert"
      />
      Shuffle Movies
    </button>
  )
}
