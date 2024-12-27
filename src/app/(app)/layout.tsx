import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="flex flex-col gap-6 min-h-screen py-10">
      <div>
        <Header />
      </div>
      <div className="flex flex-1 flex-col w-full max-w-[1200px] mx-auto space-y-5">
        {children}
      </div>
    </div>
  )
}
