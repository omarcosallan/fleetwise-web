import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Home',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="antialiased dark">{children}</body>
    </html>
  )
}
