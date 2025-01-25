import { api } from './api-client'

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
    roles: {
      id: string
      name: string
    }[]
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
      json: {
        email,
        password,
      },
    })

    return result.json<SignInWithPasswordResponse>()
  } catch {
    throw new Error()
  }
}
