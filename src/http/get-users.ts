import { api } from './api-client'

interface GetUsersResponse {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  roles: {
    id: string
    name: string
  }[]
}

export async function getUsers() {
  const result = await api
    .get('users', {
      next: { tags: ['users'] },
    })
    .json<GetUsersResponse[]>()

  return result
}
