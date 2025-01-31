import { api } from './api-client'

interface DepartmentResponse {
  id: string
  name: string
  slug: string
  active: boolean
  createdAt: string
}

export async function getDepartments() {
  const result = await api
    .get('departments', {
      next: { tags: ['departments'] },
    })
    .json<DepartmentResponse[]>()

  return result
}
