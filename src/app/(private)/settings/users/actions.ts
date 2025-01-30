'use server'

import { revalidateTag } from 'next/cache'

import type { RegisterSchema } from '../../../../components/register-form'

import { createUser } from '@/http/create-user'
import { removeUser } from '@/http/remove-user'

import { getErrorState } from '@/utils/get-error-state'

export async function createUserAction(data: RegisterSchema) {
  try {
    const { name, email, password, roles } = data

    await createUser({ name, email, password, roles })

    revalidateTag('users')

    return {
      success: true,
      message: '',
    }
  } catch (error) {
    await getErrorState(error)
  }
}

export async function removeUserAction({ id }: { id: string }) {
  try {
    await removeUser({ id })

    revalidateTag('users')

    return {
      success: true,
      message: '',
    }
  } catch (error) {
    return await getErrorState(error)
  }
}
