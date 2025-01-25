export const ROLES = ['ROLE_MODERATOR', 'ROLE_ADMIN', 'ROLE_USER'] as const

export type Role = (typeof ROLES)[number]
