// stores/authStore.ts
import { create } from 'zustand'

type UserState = {
  user: {
    id: string
    email: string
    name: string
    createdAt: string
  } | null

  setUser: (user: UserState['user']) => void
}

// TODO: save user information (fetch from firestore)
export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),
}))
