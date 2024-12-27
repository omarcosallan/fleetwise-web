'use server'

import { HTTPError } from 'ky'

import { signUp } from '@/http/sign-up'
import { SignUpSchema } from './sign-up-form'

export async function signUpAction(data: SignUpSchema) {
  const { name, email, password } = data

  try {
    await signUp({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { title } = await err.response.json()

      return { success: false, message: title, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
