import { Header } from '@/components/header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />

      <div className="flex flex-1 flex-col w-full max-w-[1200px] mx-auto space-y-5">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>

        {children}
      </div>
    </>
  )
}
