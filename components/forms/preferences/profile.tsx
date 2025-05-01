'use client'

import { SignOutButton } from '@/components/features/auth/signout-button'
import { useUserStore } from '@/store/user'
import Image from 'next/image'

import { PreferencesForm } from './form'

export function UserProfile() {
  const { profile, profileLoading, authLoading } = useUserStore()

  return profile && !profileLoading && !authLoading ? (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-gray-200">
          <Image
            src={profile.avatar || 'https://github.com/shadcn.png'}
            alt={`${profile.name} avatar`}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">
            Hi {profile.name || 'there'}!
          </span>
          <span className="text-sm text-gray-500">{profile.email}</span>
        </div>
        <SignOutButton />
      </div>

      <PreferencesForm />
    </div>
  ) : (
    <div className="flex items-center justify-center gap-2">
      <div className="h-12 w-12 rounded-full bg-gray-200" />
      <div className="h-4 w-24 bg-gray-200" />
    </div>
  )
}
