'use client'

import { SignOutButton } from '@/components/features/auth/signout-button'
import { useUserStore } from '@/store/user'
import Image from 'next/image'

import { PreferencesForm } from './form'

export function UserProfile() {
  const { profile, profileLoading } = useUserStore()

  if (profileLoading) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-gray-200">
          {profile ? (
            <Image
              src={profile.avatar || 'https://github.com/shadcn.png'}
              alt={`${profile.name} avatar`}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200" />
          )}
        </div>

        {profile && (
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold">
              Hi {profile.name || 'there'}!
            </span>
            <SignOutButton />
          </div>
        )}
      </div>

      <PreferencesForm />
    </div>
  )
}
