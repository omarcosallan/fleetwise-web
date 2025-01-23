import { Header } from '@/components/header'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />

      <div className="flex flex-1 flex-col gap-4">{children}</div>
    </>
  )
}
