import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { User } from './models/user'
import { permissions } from './permissions'
import { userSubject } from './subjects/user'
import { departmentSubject } from './subjects/department'

export * from './models/department'
export * from './models/user'
export * from './roles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appAbilitiesSchema = z.union([
  departmentSubject,
  userSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  const roles = Array.isArray(user.roles) ? user.roles : [user.roles]

  roles.forEach((role) => {
    if (typeof permissions[role] !== 'function') {
      throw new Error(`Permissions for role ${role} not found.`)
    }

    permissions[role](user, builder)
  })

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
