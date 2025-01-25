import { Header } from '@/components/header'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div data-wrapper="" className="border-grid flex flex-1 flex-col">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  )
}
