import { HTTPError } from 'ky'

export async function getErrorState(error: unknown): Promise<{
  success: false
  message: string
}> {
  let message = 'Ah, ah! Algo deu errado.'

  if (error instanceof HTTPError) {
    const { detail } = await error.response.json()
    message = detail
  }

  if (
    error instanceof Error &&
    error.cause &&
    typeof error.cause === 'object'
  ) {
    const cause = error.cause as { err?: { message?: string } }
    if (cause.err?.message) {
      message = cause.err.message
    }
  }

  return {
    success: false,
    message,
  }
}
