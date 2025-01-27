import { z } from 'zod'

export const ROLES = ['ROLE_MODERATOR', 'ROLE_ADMIN', 'ROLE_USER'] as const

export const roleSchema = z.enum(ROLES)

export const rolesSchema = z.array(roleSchema)

export type Role = z.infer<typeof roleSchema>
export type RoleArray = z.infer<typeof rolesSchema>
