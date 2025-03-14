// components/forms/auth/SignInForm.tsx
'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { FirebaseError } from 'firebase/app'

export const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setError, setLoading } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/home')
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(mapAuthError(error))
      }
    } finally {
      setLoading(false)
    }
  }

  // TODO: extract to lib/firebase.ts
  const mapAuthError = (error: FirebaseError) => {
    switch (error.code) {
      case 'auth/invalid-credential':
        return 'Invalid email or password'
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later'
      default:
        return 'Login failed. Please try again'
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <label htmlFor="email" aria-label="Email">
        Email
      </label>
      <input
        aria-placeholder="Email"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password" aria-label="Password">
        Password
      </label>
      <input
        aria-placeholder="Password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  )
}
