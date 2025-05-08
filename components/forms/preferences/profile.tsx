'use client'

import { SignOutButton } from '@/components/features/auth/signout-button'
import { useUserStore } from '@/store/user'
import Image from 'next/image'

import { PreferencesForm } from './form'

export function UserProfile() {
  const { user, userLoading } = useUserStore()

  if (userLoading) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-gray-200">
          {user ? (
            <Image
              src={user.avatar || 'https://github.com/shadcn.png'}
              alt={`${user.name} avatar`}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200" />
          )}
        </div>

        {user && (
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold">
              Hi {user.name || 'there'}!
            </span>
            <SignOutButton />
          </div>
        )}
      </div>

      <PreferencesForm />
    </div>
  )
}
