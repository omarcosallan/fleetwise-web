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

export async function getVehicles(org: string) {
  const result = await api
    .get(`organizations/${org}/vehicles`, {
      next: {
        tags: [`${org}vehicles`],
      },
    })
    .json<GetVehicleResponse[]>()

  return result
}
