import { api } from './api-client'

interface GetVehiclesRequest {
  search: string | undefined
  sortBy: string | undefined
  order: string | undefined
  pageIndex: number
  pageSize: number
}

interface VehicleResponse {
  id: string
  model: string
  manufacturer: string
  licensePlate: string
  register: string
  rented: boolean
  active: boolean
  createdAt: Date
  departmentSlug: string
  author: {
    name: string
    avatarUrl: string
  }
}

export async function getVehicles({
  sortBy,
  search,
  order,
  pageIndex,
  pageSize,
}: GetVehiclesRequest) {
  const urlParams = new URLSearchParams({
    pageSize: pageSize.toString(),
    pageIndex: pageIndex.toString(),
  })

  if (search) {
    urlParams.append('search', search)
  }

  if (sortBy) {
    urlParams.append('sortBy', sortBy)
  }

  if (order) {
    urlParams.append('order', order)
  }

  const result = await api
    .get(`vehicles?${urlParams.toString()}`, {
      next: { tags: [`vehicles?${urlParams.toString()}`] },
    })
    .json<VehicleResponse[]>()

  return result
}
