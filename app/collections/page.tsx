import { Metadata } from 'next'
import NoMovie from './no-movie'

export const metadata: Metadata = {
  title: 'My Collections',
  description: 'View your collections',
}

// TODO: add collection cards here
export default function Collections() {
  return (
    <div className="flex flex-col gap-6">
      <NoMovie />
      {/* <h1 className="text-2xl font-bold">Collections</h1> */}
    </div>
  )
}
