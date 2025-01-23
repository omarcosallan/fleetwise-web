import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/utils/cn'

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
    <html lang="en" className={cn(inter.variable, 'antialiased')}>
      <body>{children}</body>
    </html>
  )
}
