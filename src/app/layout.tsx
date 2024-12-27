import { isAuthenticated } from '@/auth/auth'

import './globals.css'

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { redirect } from 'next/navigation'

import { Toaster } from '@/components/ui/sonner'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Create Next App',
}

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}

          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
