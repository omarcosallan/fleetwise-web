import { Header } from '@/components/header'
import { SessionProvider } from 'next-auth/react'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div data-wrapper="" className="border-grid flex flex-1 flex-col">
        <Header />
        <main className="flex flex-1 flex-col h-full">{children}</main>
      </div>
    </SessionProvider>
  )
}
