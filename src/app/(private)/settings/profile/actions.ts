'use server'

import { updateUser } from '@/http/update-user'
import type { UserSchema } from './user-form'

export async function updateUserAction(data: UserSchema) {
  const { id, name, email, roles } = data

  await updateUser({ id, name, email, roles })
}
