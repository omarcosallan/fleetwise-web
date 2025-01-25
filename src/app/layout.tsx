import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

const inter = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn('min-h-svh antialiased dark', inter.variable)}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <div className="relative flex min-h-svh flex-col bg-background">
            {children}
          </div>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  )
}
