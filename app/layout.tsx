import type { Metadata } from 'next'
import { Roboto, Roboto_Mono } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import NavLink from '@/components/features/layout/nav-link'

import '@/styles/globals.scss'

// Roboto font will be applied to the body text (base styles)
const roboto = Roboto({
  variable: '--font-roboto', // create a custom CSS variable for the font
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'], // Include regular weight (400) for body text
})

// Roboto Mono font can be imported and applied as needed (title and code blocks)
const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono', // create a custom CSS variable for the font
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    // FIXME: add a dynamic title
    template: '%s | Cinemo', // template for dynamic title
    default: 'Cinemo - Your Favorite Movies, Right Here!',
  },
  description:
    'Experience movies that match your mood. Whether you are seeking joy, adventure, reflection, or comfort, Cinemo helps you discover films that resonate with your emotional journey. Create personal collections, share meaningful moments, and find your next favorite story.',
  keywords: [
    'mood-based movies',
    'emotional films',
    'personal movie recommendations',
    'feel-good movies',
    'movie moods',
    'cinematic experience',
    'emotional storytelling',
    'movie discovery',
    'film emotions',
    'personal cinema journey',
  ],

  // Authorship and Publishing
  authors: [{ name: 'Rayna Lei' }],
  creator: 'Rayna Lei',
  publisher: 'Rayna Lei',

  // Search Engine Directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* inject custom font variables for global styles */}
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* TODO: use a header component for user authentication in the future (e.g. user profile dropdown for sign in/out) */}
        <header className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Cinemo Logo"
                  width={204}
                  height={40}
                  // ensure the logo is always visible
                  // https://nextjs.org/docs/pages/api-reference/components/image#priority
                  priority
                  className="w-36 h-auto sm:w-auto"
                />
              </Link>

              <div className="flex items-center space-x-8">
                <NavLink href="/preferences">MY PREFERENCES</NavLink>
                <NavLink href="/collections">COLLECTIONS</NavLink>
              </div>
            </nav>
          </div>
        </header>

        <main className="flex-grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        <footer className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center items-center">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  © {new Date().getFullYear()} Cinemo. All rights reserved.
                </p>
              </div>

              <div className="flex items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                  Powered by
                </p>
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Image
                    src="/tmdb-logo.svg"
                    alt="TMDB Logo"
                    width={56}
                    height={24}
                  />
                </a>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-500 text-center">
              <p>
                This product uses the TMDB API but is not endorsed or certified
                by TMDB.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
