import type { Role } from '@/types/roles'
import type { DefaultSession, User as DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User extends DefaultUser {
    accessToken: string
    refreshToken: string
    roles: Role[]
  }

  export interface Session extends DefaultSession {
    user: User
  }
}
