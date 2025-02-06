import { api } from './api-client'

interface DepartmentResponse {
  id: string
  name: string
  slug: string
  active: boolean
  createdAt: string
}

export async function getDepartment({ slug }: { slug: string }) {
  try {
    const result = await api
      .get(`departments/${slug}`, {
        next: { tags: [`department/${slug}`] },
      })
      .json<DepartmentResponse>()

    return result
  } catch {}
}
