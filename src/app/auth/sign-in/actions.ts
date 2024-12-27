'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'
import { HTTPError } from 'ky'

import type { SignInSchema } from './sign-in-form'
import { cookies } from 'next/headers'

export async function signInWithEmailAndPassword(data: SignInSchema) {
  const { email, password } = data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    const allCoolies = await cookies()
    allCoolies.set(process.env.TOKEN_NAME!, token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      if (err.response.status === 403) {
        return {
          success: false,
          message: 'E-mail or password incorrect',
          errors: null,
        }
      }
      const { title } = (await err.response.json()) as {
        title: string
      }

      return {
        success: false,
        message: title,
        errors: null,
      }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
