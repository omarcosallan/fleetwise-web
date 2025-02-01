import { api } from './api-client'

export async function deleteDepartment({ slug }: { slug: string }) {
  const result = await api.delete(`departments/${slug}`)

  return result
}
