import { api } from './api-client'

interface CreateVehicleRequest {
  org: string
  manufacturer: string
  manufacturingYear: number
  active: boolean
  rented: boolean
  plate: string
  register: string
  model: string
}

type CreateVehicleResponse = void

export async function createVehicle({
  org,
  manufacturer,
  manufacturingYear,
  active,
  rented,
  plate,
  register,
  model,
}: CreateVehicleRequest): Promise<CreateVehicleResponse> {
  await api.post(`organizations/${org}/vehicles`, {
    json: {
      manufacturer,
      manufacturingYear,
      active,
      rented,
      plate,
      register,
      model,
    },
  })
}
