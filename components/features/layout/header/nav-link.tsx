'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        isActive
          ? 'text-foreground font-bold'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
      }`}
    >
      {children}
    </Link>
  )
}
