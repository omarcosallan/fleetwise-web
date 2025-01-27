'use server'

import type { UserSchema } from '@/components/profile-form'

import { updateUser } from '@/http/update-user'

export async function updateUserAction(data: UserSchema) {
  const { id, name, email, roles } = data

  await updateUser({ id, name, email, roles })
}
