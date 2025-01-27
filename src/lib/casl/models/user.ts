import { z } from 'zod'

import { rolesSchema } from '../roles'

export const userSchema = z.object({
  __typename: z.literal('User').default('User'),
  id: z.string(),
  roles: rolesSchema,
})

export type User = z.infer<typeof userSchema>
