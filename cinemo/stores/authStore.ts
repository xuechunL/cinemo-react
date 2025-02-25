// stores/authStore.ts
import { create } from 'zustand'
import { AuthState } from '@/types/auth'
import { createUserDocumentFromAuth } from '@/lib/firebase'

// TODO: Refine the auth store and add a better error handling
export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	loading: true,
	error: null,
	setUser: (user) => {
		set({ user, loading: false })
		if (user) {
			createUserDocumentFromAuth(user)
		}
	},
	setLoading: (loading) => set({ loading }),
	setError: (error) => set({ error, loading: false }),
}))
