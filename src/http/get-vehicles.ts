import { api } from './api-client'

interface GetVehicleResponse {
  vehicles: {
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
  }[]
  page: number
  size: number
  pageCount: number
}

interface GetVehiclesRequest {
  org: string
  pageSize: number
  pageIndex: number
  search: string | undefined
}

export async function getVehicles({
  org,
  pageSize,
  pageIndex,
  search,
}: GetVehiclesRequest) {
  const urlParams = new URLSearchParams({
    pageSize: pageSize.toString(),
    pageIndex: pageIndex.toString(),
  })

  if (search) {
    urlParams.append('search', search)
  }

  const result = await api
    .get(`organizations/${org}/vehicles?${urlParams.toString()}`, {
      next: {
        tags: [`${org}vehicles`],
      },
    })
    .json<GetVehicleResponse>()

  return result
}
