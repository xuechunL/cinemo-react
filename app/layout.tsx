import type { Metadata } from 'next'
import { Roboto, Roboto_Mono } from 'next/font/google'

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
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
