import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'

export default function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <Tabs />

      <main className="flex flex-1 flex-col w-full max-w-[1200px] mx-auto space-y-5">
        {children}
      </main>
    </>
  )
}
