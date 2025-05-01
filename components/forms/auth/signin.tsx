'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInSchema, type SignInFormData } from '@/utils/validations/auth'
import { z } from 'zod'
import { useUserStore } from '@/store/user'

export const SignInForm = () => {
  const { setAuthUser } = useUserStore()
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<
    Partial<SignInFormData> & { submitError?: string }
  >({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof SignInFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form data
      const validatedData = signInSchema.parse(formData)

      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      console.log('response', response)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Sign in failed')
      }

      const data = await response.json()
      setAuthUser(data.user)

      router.push('/home')
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const newErrors: Partial<SignInFormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof SignInFormData] = err.message
          }
        })
        setErrors(newErrors)
      } else if (error instanceof Error) {
        setErrors({ submitError: error.message })
      } else {
        setErrors({ submitError: 'An unexpected error occurred' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      {/* TODO: abstract form fields to a component */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          // type="email"
          value={formData.email}
          onChange={handleChange}
          className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
            errors.email ? 'border-red-500' : ''
          }`}
          autoComplete="email"
          placeholder="john.doe@example.com"
        />

        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
            errors.password ? 'border-red-500' : ''
          }`}
          autoComplete="current-password"
          placeholder="********"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <button
        disabled={loading}
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      {errors.submitError && (
        <p className="text-red-500">{errors.submitError}</p>
      )}
    </form>
  )
}
