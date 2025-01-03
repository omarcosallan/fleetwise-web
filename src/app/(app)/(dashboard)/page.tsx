import { Metadata } from 'next'

import { OrganizationList } from './organization-list'

import { Header } from '@/components/header'
import { RecentActivity } from './recent-activity'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export const revalidate = 900

export default async function DashboardPage() {
  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col w-full max-w-[1200px] mx-auto space-y-5">
        <h2 className="text-3xl font-bold tracking-tight">Organizações</h2>
        <div className="grid grid-cols-6 gap-8">
          <div className="col-span-4 grid grid-cols-2 gap-4">
            <OrganizationList />
          </div>

          <div className="col-span-2">
            <RecentActivity />
          </div>
        </div>
      </div>
    </>
  )
}
