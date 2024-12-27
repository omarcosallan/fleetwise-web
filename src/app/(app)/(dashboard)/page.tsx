import { Metadata } from 'next'

import { OrganizationList } from './organization-list'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export const revalidate = 900

export default async function DashboardPage() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Organizações</h2>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4 grid grid-cols-2 gap-4">
          <OrganizationList />
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  )
}
