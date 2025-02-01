import { api } from './api-client'

interface GetDepartmentsRequest {
  search: string | undefined
  sortBy: string | undefined
}

interface DepartmentResponse {
  id: string
  name: string
  slug: string
  active: boolean
  createdAt: string
}

export async function getDepartments({
  search,
  sortBy,
}: GetDepartmentsRequest) {
  const urlParams = new URLSearchParams()

  if (search) {
    urlParams.append('search', search)
  }

  if (sortBy) {
    urlParams.append('sortBy', sortBy)
  }

  const result = await api
    .get(`departments?${urlParams.toString()}`, {
      next: { tags: ['departments'] },
    })
    .json<DepartmentResponse[]>()

  return result
}
