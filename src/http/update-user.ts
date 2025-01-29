import type { RoleArray } from '@/lib/casl'
import { api } from './api-client'

interface UpdateUserProps {
  id: string
  name: string
  email: string
  roles: RoleArray
}

export async function updateUser({ id, name, email, roles }: UpdateUserProps) {
  const result = await api.put(`users/${id}`, {
    json: { name, email, roles },
  })

  return result
}
