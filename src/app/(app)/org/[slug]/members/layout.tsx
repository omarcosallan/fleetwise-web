export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Members</h1>
        {children}
      </div>
    </>
  )
}
