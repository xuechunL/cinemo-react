// app/preferences/page.tsx

import Image from 'next/image'
import Avatar from '@/components/ui/avatar'
import { SignOutButton } from '@/components/features/auth/signout-button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Preferences',
  description: 'Manage your preferences',
}

export default function Preferences() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-1">
        <Avatar>
          <Image
            src="https://github.com/shadcn.png"
            alt="Avatar"
            width={42}
            height={42}
          />
        </Avatar>
        <SignOutButton />
      </div>
      {/* TODO: use user name here */}
      <h1 className="text-2xl font-bold">Hi, there!</h1>
      <h2 className="text-lg">How are you feeling now?</h2>

      {/* TODO: Preferences Settings */}
    </div>
  )
}
