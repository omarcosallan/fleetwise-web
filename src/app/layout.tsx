import './globals.css'

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Create Next App',
}

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="antialiased dark">{children}</body>
    </html>
  )
}
