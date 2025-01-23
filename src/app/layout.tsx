import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/utils/cn'
import { Providers } from './providers'

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
      className={cn(inter.variable, 'antialiased dark')}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
