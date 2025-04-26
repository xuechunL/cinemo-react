'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { isValidEmail, isValidPassword } from '@/utils/input-validation'

export const SignUpForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!name) {
        throw new Error('Please fill in the name field')
      }

      if (!email) {
        throw new Error('Please fill in the email field')
      }

      if (!password) {
        throw new Error('Please fill in the password field')
      }

      // Add client-side validation
      if (!isValidEmail(email)) {
        throw new Error('Invalid email format')
      }

      if (!isValidPassword(password)) {
        throw new Error(
          // 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          'Password must be at least 8 characters long'
        )
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Sign up failed')
      }

      router.push('/home')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          // required
          placeholder="John Doe"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          // type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          // required
          placeholder="john.doe@example.com"
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password (at least 8 characters long)
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          // required
          autoComplete="new-password"
          placeholder="********"
        />
      </div>

      {/* TODO: preferences section (optional) */}

      <button
        disabled={loading}
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
