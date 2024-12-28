import { Metadata } from 'next'

import { VehicleList } from './vehicle-list'

export const metadata: Metadata = {
  title: 'Vehicles',
}

export default function OrgPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Vehicles</h1>

      <VehicleList />
    </div>
  )
}
