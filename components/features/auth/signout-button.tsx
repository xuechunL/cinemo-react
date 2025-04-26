'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const SignOutButton = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Sign out failed')
      }

      router.push('/signin')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleSignOut}
      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    >
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  )
}
