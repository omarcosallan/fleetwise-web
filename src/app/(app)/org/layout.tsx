import { Tabs } from '@/components/tabs'

export default function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Tabs />

      <main className="flex flex-1 flex-col w-full max-w-[1200px] mx-auto space-y-5">
        {children}
      </main>
    </>
  )
}
