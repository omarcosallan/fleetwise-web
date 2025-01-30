import { HTTPError } from 'ky'

export async function getErrorState(error: unknown): Promise<{
  success: false
  message: string
}> {
  let message = 'Ah, ah! Algo deu errado.'

  console.log(error instanceof HTTPError)

  if (error instanceof HTTPError) {
    const { detail } = await error.response.json()
    console.log(detail)
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
