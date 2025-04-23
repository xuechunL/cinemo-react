// app/preferences/page.tsx

import Image from 'next/image'
import Avatar from '@/components/ui/avatar'

export default function Preferences() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Avatar>
        <Image
          src="https://github.com/shadcn.png"
          alt="Avatar"
          width={42}
          height={42}
          loading="lazy"
        />
      </Avatar>
      <h1 className="text-2xl font-bold">Hi, there!</h1>
      <h2 className="text-lg">How are you feeling now?</h2>

      {/* TODO: Preferences Settings */}
    </div>
  )
}
