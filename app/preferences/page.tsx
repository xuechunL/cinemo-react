// app/preferences/page.tsx

import type { Metadata } from 'next'
import { UserProfile } from '@/components/forms/preferences/profile'
import { AuthProvider } from '@/components/providers/auth-provider'

export const metadata: Metadata = {
  title: 'My Preferences',
  description: 'Manage your preferences',
}

export default function Preferences() {
  return (
    <AuthProvider>
      <UserProfile />
    </AuthProvider>
  )
}
