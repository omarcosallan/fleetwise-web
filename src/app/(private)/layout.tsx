import { Header } from '@/components/header'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="border-grid flex flex-1 flex-col">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  )
}
