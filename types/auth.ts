import { User } from 'firebase/auth'

export type UserAuth = User

export type AuthState = {
  user: UserAuth | null
  loading: boolean
  error: string | null
  setUser: (user: UserAuth | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}
