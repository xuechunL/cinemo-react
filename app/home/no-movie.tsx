import { EmptyPlaceholder } from '@/components/ui/empty-placeholder'
import Link from 'next/link'

export default function NoMovie() {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      <EmptyPlaceholder />
      <p className="text-lg font-bold mb-4">
        Your exceptional taste is one of a kind!
      </p>

      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        For now, we couldn&apos;t find any movies that match your preferences.
        Please explore other{' '}
        <Link href="/preferences" className="text-blue-500 hover:underline">
          preferences
        </Link>
        .
      </p>
    </div>
  )
}
