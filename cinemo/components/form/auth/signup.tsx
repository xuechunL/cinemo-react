// components/forms/auth/SignUpForm.tsx
'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, createUserDocumentFromAuth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { FirebaseError } from 'firebase/app'
// TODO: use zod for validation and tanstack form for form handling

export const SignUpForm = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { setError, setLoading } = useAuthStore()
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			// TODO: move to lib/firebase.ts to add collection reference
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			console.log(userCredential)
			const user = userCredential.user
			// Create user document
			createUserDocumentFromAuth(user, { displayName: name })
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
			case 'auth/email-already-in-use':
				return 'Email already in use'
			case 'auth/invalid-email':
				return 'Invalid email'
			case 'auth/weak-password':
				return 'Weak password'
			case 'auth/too-many-requests':
				return 'Too many requests'
			default:
				return 'An error occurred'
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			{/* Form fields */}
			<label htmlFor="name" aria-label="Name">
				Name
			</label>
			<input
				aria-placeholder="Name"
				placeholder="Name"
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
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
			<button type="submit">Sign Up</button>
		</form>
	)
}
