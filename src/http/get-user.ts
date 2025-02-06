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

export async function getUser({ id }: { id: string }) {
  try {
    const result = await api.get(`users/${id}`, {
      next: { tags: ['user'] },
    })

    const user = await result.json<GetUsersResponse>()

    const roles: Role[] = user.roles
      .map((role) => role.name)
      .filter((role): role is Role => ROLES.includes(role as Role))

    return {
      ...user,
      roles,
    }
  } catch {}
}
