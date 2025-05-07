'use client'

import { useUserStore } from '@/store/user'
import NavLink from './nav-link'

export function NavMenu() {
  const { authUser, authLoading } = useUserStore()

  if (authLoading) {
    return null
  }

  if (!authUser) {
    return (
      <div className="flex items-center space-x-8 transition-opacity duration-300">
        <NavLink href="/signin">SIGN IN</NavLink>
        <NavLink href="/signup">SIGN UP</NavLink>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-8 transition-opacity duration-300">
      <NavLink href="/preferences">MY PREFERENCES</NavLink>
      <NavLink href="/collections">MY COLLECTIONS</NavLink>
    </div>
  )
}
