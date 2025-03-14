// components/features/layout/header/index.tsx
'use client'

import { UserAuth } from '@/types/auth'
import Link from 'next/link'
import { useAuthStore } from '@/stores/authStore'
import { signOutUser } from '@/lib/firebase'

// TODO: Add profile dropdown
function ProfileDropdown({ user }: { user: UserAuth }) {
  return (
    <div className="flex gap-4">
      ProfileDropdown: {user?.displayName || 'Guest'}
      <button type="button" onClick={signOutUser}>
        Sign Out
      </button>
    </div>
  )
}

// Header component for all pages
export default function Header() {
  const { user, loading } = useAuthStore()

  return (
    <header className="flex justify-between items-center p-4">
      <div>Cinemo</div>
      {loading ? null : (
        <div className="flex gap-4">
          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <div className="flex gap-4">
              <Link href="/signin">SignIn</Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
