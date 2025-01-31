import { api } from './api-client'

interface DepartmentRequest {
  name: string
}

export async function createDepartment({ name }: DepartmentRequest) {
  const result = await api.post('departments', {
    json: { name },
  })

  return result
}
