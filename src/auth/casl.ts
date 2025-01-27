import { defineAbilityFor } from '@/lib/casl'
import { auth } from './auth'

export async function ability() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  const ability = defineAbilityFor({
    __typename: 'User',
    id: session.user.id as string,
    roles: session.user.roles,
  })

  return ability
}
