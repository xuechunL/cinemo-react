// store/user.ts
import { create } from 'zustand'
import type { User } from 'firebase/auth'
import type { UserProfile, UserPreferences } from '@/types/user'

interface UserState {
  // Auth state
  authUser: User | null
  authLoading: boolean
  // authError: string | null

  // Profile state
  profile: UserProfile | null
  profileLoading: boolean
  profileError: string | null

  // Actions
  setAuthUser: (user: User | null) => void
  setAuthLoading: (loading: boolean) => void
  // setAuthError: (error: string | null) => void
  setProfile: (profile: UserProfile | null) => void
  setProfileLoading: (loading: boolean) => void
  setProfileError: (error: string | null) => void
  updatePreferences: (preferences: UserPreferences) => Promise<void>
  fetchProfile: (uid: string) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  // Initial state
  authUser: null,
  authLoading: true,
  // authError: null,
  profile: null,
  profileLoading: true,
  profileError: null,

  // Basic setters
  setAuthUser: (user) => {
    set({ authUser: user })
    if (user) {
      // When auth user is set, fetch their profile
      get().fetchProfile(user.uid)
    } else {
      set({ profile: null, profileLoading: false, profileError: null })
    }
  },
  setAuthLoading: (loading) => set({ authLoading: loading }),
  // setAuthError: (error) => set({ authError: error }),
  setProfile: (profile) => set({ profile }),
  setProfileLoading: (loading) => set({ profileLoading: loading }),
  setProfileError: (error) => set({ profileError: error }),

  // Update preferences
  updatePreferences: async (preferences) => {
    const { authUser } = get()
    if (!authUser) {
      console.error('Cannot update preferences: User not authenticated')
      set({ profileError: 'You must be signed in to update preferences' })
      return
    }

    set({ profileError: null })

    try {
      const response = await fetch(`/api/users/${authUser.uid}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update preferences')
      }

      const data = await response.json()
      set({
        profile: {
          ...get().profile!,
          preferences: data.preferences,
        } as UserProfile,
      })
    } catch (error) {
      console.error('Error updating preferences:', error)
      set({
        profileError:
          error instanceof Error
            ? error.message
            : 'Failed to update preferences',
      })
    }
  },

  // Fetch profile
  fetchProfile: async (uid: string) => {
    set({ profileLoading: true, profileError: null })

    try {
      const response = await fetch(`/api/users/${uid}/profile`)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch profile')
      }

      const data = await response.json()
      set({
        profile: data as UserProfile,
        profileLoading: false,
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
      set({
        profileError:
          error instanceof Error ? error.message : 'Failed to fetch profile',
        profileLoading: false,
      })
    }
  },
}))
