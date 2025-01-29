import { ROLES, type Role } from '@/lib/casl'
import { api } from './api-client'

import { HTTPError } from 'ky'

interface RoleResponse {
  id: string
  name: string
}

interface SignInWithPasswordRequest {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  user: {
    id: string
    name: string
    email: string
    avatarUrl: string
    roles: RoleResponse[]
  }
  accessToken: string
  refreshToken: string
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  try {
    const result = await api.post('auth/sign-in', {
      json: { email, password },
    })

    const response = await result.json<SignInWithPasswordResponse>()

    const roles: Role[] = response.user.roles
      .map((role) => role.name)
      .filter((role): role is Role => ROLES.includes(role as Role))

    return {
      ...response,
      user: {
        ...response.user,
        roles,
      },
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      const body = await error.response.json()
      throw new Error(body.detail || 'Credenciais inválidas')
    }
    throw new Error('Erro desconhecido ao tentar fazer login')
  }
}
