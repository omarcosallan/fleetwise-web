import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  return (
    <>
      <div className="p-8 pt-6 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
    </>
  )
}
