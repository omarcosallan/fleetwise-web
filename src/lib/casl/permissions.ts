import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ROLE_MODERATOR(user, { can, cannot }) {
    can('manage', 'all')

    cannot('delete', 'User')
    can('delete', 'User', { id: { $ne: user.id } })
  },
  ROLE_ADMIN(user, { can, cannot }) {
    can('manage', 'all')

    cannot('delete', 'User')
    can('delete', 'User', { id: { $ne: user.id } })
  },
  ROLE_USER(user, { can }) {
    can('get', 'Department')

    can('update', 'User', { id: user.id })
  },
}
