'use server'

import { createUser } from '@/http/create-user'
import { revalidateTag } from 'next/cache'
import type { RegisterSchema } from '../../../../components/register-form'
import { removeUser } from '@/http/remove-user'

export async function createUserAction(data: RegisterSchema) {
  const { name, email, password, roles } = data

  await createUser({ name, email, password, roles })

  revalidateTag('users')
}

export async function removeUserAction({ id }: { id: string }) {
  await removeUser({ id })

  revalidateTag('users')
}
