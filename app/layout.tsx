import type { Metadata } from 'next'
import { Roboto, Roboto_Mono } from 'next/font/google'

import '@/styles/globals.scss'

// Roboto font will be applied to the body text (base styles)
export const roboto = Roboto({
  variable: '--font-roboto', // create a custom CSS variable for the font
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'], // Include regular weight (400) for body text
})

// Roboto Mono font can be imported and applied as needed (title and code blocks)
export const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono', // create a custom CSS variable for the font
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'CINEMO',
  description: 'CINEMO',
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
