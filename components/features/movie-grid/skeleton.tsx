export default function MovieCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 aspect-[2/3] rounded-md mb-3" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  )
}
