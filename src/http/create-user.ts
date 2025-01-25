import type { Role } from '@/types/roles'

import { api } from './api-client'

interface UserRequest {
  email: string
  name: string
  password: string
  roles: Role[]
}

export async function createUser({
  email,
  name,
  password,
  roles,
}: UserRequest) {
  const result = await api.post('auth/register', {
    json: { email, name, password, roles },
  })

  return result
}
