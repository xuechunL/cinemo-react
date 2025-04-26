'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify')
        const data = await response.json()

        setIsAuthenticated(data.verified)
        if (!data.verified) {
          console.log('Not verified')
          router.push('/signin')
        }
      } catch (error) {
        console.error('Error verifying session cookie:', error)
        setIsAuthenticated(false)
        router.push('/signin')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  return { isLoading, isAuthenticated }
}
