// components/providers/auth-provider.tsx
'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/store/user'
// import { useRouter } from 'next/navigation'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuthUser, setAuthLoading, authUser } = useUserStore()
  // const router = useRouter()

  useEffect(() => {
    // Set up Firebase auth state listener
    const checkAuth = async () => {
      setAuthLoading(true)

      // Verify session
      try {
        const response = await fetch('/api/auth/verify')
        const data = await response.json()

        if (data.verified) {
          // Valid session
          setAuthUser(data.user)
        } else {
          // No valid session
          setAuthUser(null)
          // router.push('/signin')
        }
      } catch (error) {
        console.error('Error verifying session:', error)
        setAuthUser(null)
        // router.push('/signin')
      } finally {
        setAuthLoading(false)
      }
    }

    if (!authUser) {
      checkAuth()
    }
  }, [setAuthUser, setAuthLoading, authUser])

  return children
}
