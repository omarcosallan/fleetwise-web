import { Metadata } from 'next'

import { VehicleList } from './vehicle-list'

import { CreateVehicle } from './create-vehicle'
import { ability } from '@/auth/auth'

export const metadata: Metadata = {
  title: 'Vehicles',
}

export default async function OrgPage() {
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Vehicles</h1>

        {permissions?.can('create', 'Vehicle') && <CreateVehicle />}
      </div>

      <VehicleList />
    </div>
  )
}
