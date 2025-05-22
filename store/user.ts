// store/user.ts
import { create } from 'zustand'
import type { UserProfile, UserPreferences } from '@/types/user'

interface UserState {
  // User state
  user: UserProfile | null
  userLoading: boolean
  userError: string | null

  // Basic setters
  setUser: (user: UserProfile | null) => void
  setUserLoading: (loading: boolean) => void
  setUserError: (error: string | null) => void

  // Async actions
  updatePreferences: (preferences: UserPreferences) => Promise<void>
  fetchUser: () => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  // Initial state
  user: null,
  userLoading: true,
  userError: null,

  // Basic setters
  setUser: (user) => set({ user }),
  setUserLoading: (loading) => set({ userLoading: loading }),
  setUserError: (error) => set({ userError: error }),

  // Update preferences
  updatePreferences: async (preferences) => {
    const { user } = get()
    if (!user) {
      console.error('Cannot update preferences: User not authenticated')
      set({ userError: 'You must be signed in to update preferences' })
      return
    }

    set({ userError: null })

    try {
      const response = await fetch(`/api/user/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          preferences,
        }),
      })

      if (!response.ok) {
        const error = await response.json()

        if (error.error.includes('AuthError')) {
          throw new Error('Please sign in to update preferences')
        } else {
          throw new Error(error.error || 'Failed to update preferences')
        }
      }

      const data = await response.json()
      set({
        user: {
          ...get().user!,
          preferences: data.preferences,
        } as UserProfile,
      })
    } catch (error) {
      console.error('Error updating preferences:', error)
      set({
        userError:
          error instanceof Error
            ? error.message
            : 'Failed to update preferences',
      })
    }
  },

  // Fetch user profile
  fetchUser: async () => {
    set({ userLoading: true, userError: null })

    try {
      const response = await fetch(`/api/user/profile`)

      if (!response.ok) {
        const error = await response.json()

        if (error.error.includes('AuthError')) {
          throw new Error('Please sign in to fetch profile')
        } else {
          throw new Error(error.error || 'Failed to fetch profile')
        }
      }

      const data = await response.json()
      set({
        user: data as UserProfile,
        userLoading: false,
      })
    } catch (error) {
      // console.error('Error fetching profile:', error)
      set({
        userError:
          error instanceof Error ? error.message : 'Failed to fetch profile',
        userLoading: false,
      })
    }
  },
}))
