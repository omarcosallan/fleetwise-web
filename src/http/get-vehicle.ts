import { api } from './api-client'

interface GetVehicleResponse {
  model: string
  manufacturer: string
  id: string
  plate: string
  register: string
  manufacturingYear: number
  active: boolean
  rented: boolean
  createdAt: string
  author: {
    id: string
    name: string
    avatarUrl: string
  }
}

export async function getVehicle(org: string, vehicleId: string) {
  const result = await api
    .get(`organizations/${org}/vehicles/${vehicleId}`)
    .json<GetVehicleResponse>()

  return result
}
