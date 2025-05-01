// app/preferences/page.tsx

import type { Metadata } from 'next'
import { UserProfile } from '@/components/forms/preferences/profile'

export const metadata: Metadata = {
  title: 'My Preferences',
  description: 'Manage your preferences',
}

export default function Preferences() {
  return <UserProfile />
}
