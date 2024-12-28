import { api } from './api-client'

interface GetOrganizationsResponse {
  id: string
  name: string
  slug: string
  avatarUrl: string | null
  createdAt: Date
  role: string
  owner: {
    id: string
    name: string
    avatarUrl: string
  }
}

export async function getOrganizations() {
  const result = await api
    .get('organizations')
    .json<GetOrganizationsResponse[]>()

  return result
}
