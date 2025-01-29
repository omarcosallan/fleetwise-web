'use server'

import { signIn } from '@/auth/auth'

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
    let errorMessage = 'Ocorreu um erro inesperado.'

    if (
      error instanceof Error &&
      error.cause &&
      typeof error.cause === 'object'
    ) {
      const cause = error.cause as { err?: { message?: string } }
      if (cause.err?.message) {
        errorMessage = cause.err.message
      }
    }

    return {
      success: false,
      message: errorMessage,
    }
  }
}
