// components/providers/auth-provider.tsx
'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/store/user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchUser, user } = useUserStore()

  useEffect(() => {
    // console.log('user', user)
    if (!user) {
      fetchUser()
    }
  }, [fetchUser, user])

  return children
}
