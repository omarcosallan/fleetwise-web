import { Metadata } from 'next'

import { VehicleList } from './vehicle-list'

import { CreateVehicle } from './create-vehicle'

export const metadata: Metadata = {
  title: 'Vehicles',
}

export default function OrgPage() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Vehicles</h1>

        <CreateVehicle />
      </div>

      <VehicleList />
    </div>
  )
}
