import { ROLES, type Role } from '@/lib/casl'

interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  user: {
    name: string
    email: string
    avatarUrl: string | null
    roles: { name: string }[]
  }
}

export async function refreshTokens(refreshToken: string): Promise<{
  accessToken: string
  refreshToken: string
  user: {
    name: string
    email: string
    picture: string | null
    roles: Role[]
  }
}> {
  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables.')
  }

  const response = await fetch(`${apiUrl}auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  })

  if (!response.ok) {
    throw new Error('Failed to refresh tokens.')
  }

  const refreshedTokens: RefreshTokenResponse = await response.json()

  return {
    accessToken: refreshedTokens.accessToken,
    refreshToken: refreshedTokens.refreshToken,
    user: {
      name: refreshedTokens.user.name,
      email: refreshedTokens.user.email,
      picture: refreshedTokens.user.avatarUrl,
      roles: refreshedTokens.user.roles
        .map((role) => role.name)
        .filter((role): role is Role => ROLES.includes(role as Role)),
    },
  }
}
