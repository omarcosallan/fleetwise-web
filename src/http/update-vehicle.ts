import { api } from './api-client'

interface UpdateVehicleRequest {
  org: string
  model: string
  manufacturer: string
  manufacturingYear: number
  active: boolean
  rented: boolean
  plate: string
}

type UpdateVehicleResponse = void

export async function updateVehicle({
  org,
  model,
  manufacturer,
  manufacturingYear,
  active,
  rented,
  plate,
}: UpdateVehicleRequest): Promise<UpdateVehicleResponse> {
  await api.put(`organizations/${org}/vehicles/${plate}`, {
    json: {
      manufacturer,
      manufacturingYear,
      active,
      rented,
      model,
    },
  })
}
