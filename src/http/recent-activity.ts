import { api } from './api-client'

interface GetRecentActivityResponse {
  type: string
  createdAt: Date
  ownerName: string
  organizationName: string
}

export async function getRecentActivity() {
  const result = await api
    .get(`organizations/recent-activity`)
    .json<GetRecentActivityResponse[]>()

  return result
}
