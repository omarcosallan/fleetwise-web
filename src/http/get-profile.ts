import { api } from './api-client'

interface GetProfileResponse {
  id: string
  name: string
  email: string
  avatarUrl: string | null
}

export async function getProfile() {
  const result = await api
    .get('profile', {
      next: { tags: ['profile'] },
    })
    .json<GetProfileResponse>()

  return result
}
