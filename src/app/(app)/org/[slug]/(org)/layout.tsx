import { ability } from '@/auth/auth'

import { CreateVehicle } from './create-vehicle'
import { VehiclesFilters } from './vehicles-filters'

import { Suspense } from 'react'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const permissions = await ability()

  return (
    <>
      <div className="flex gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Vehicles</h1>

        {permissions?.can('create', 'Vehicle') && <CreateVehicle />}
      </div>

      <main className="flex flex-1 flex-col w-full max-w-[1200px] mx-auto space-y-5">
        <Suspense fallback={null}>
          <VehiclesFilters />
        </Suspense>

        {children}
      </main>
    </>
  )
}
