'use server'

import { signIn } from '@/auth/auth'
import { getErrorState } from '@/utils/get-error-state'

export async function signInWithEmailAction({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    return {
      success: true,
    }
  } catch (error) {
    return await getErrorState(error)
  }
}
