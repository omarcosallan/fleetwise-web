'use server'

import type { UserSchema } from '@/components/profile-form'

import { updateUser } from '@/http/update-user'
import { getErrorState } from '@/utils/get-error-state'

import { revalidateTag } from 'next/cache'

export async function updateUserAction(data: UserSchema) {
  try {
    const { id, name, email, roles } = data

    await updateUser({ id, name, email, roles })

    revalidateTag('users')

    return {
      success: true,
      message: '',
    }
  } catch (error) {
    return await getErrorState(error)
  }
}
