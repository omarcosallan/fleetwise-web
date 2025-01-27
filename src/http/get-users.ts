import { api } from './api-client'

import { ROLES, type Role } from '@/lib/casl'

interface RoleResponse {
  id: string
  name: string
}

interface GetUsersResponse {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  roles: RoleResponse[]
}

export async function getUsers() {
  const result = await api.get('users', {
    next: { tags: ['users'] },
  })

  const users = await result.json<GetUsersResponse[]>()

  const processedUsers = users.map((user) => ({
    ...user,
    roles: user.roles
      .map((role) => role.name)
      .filter((role): role is Role => ROLES.includes(role as Role)),
  }))

  return processedUsers
}
