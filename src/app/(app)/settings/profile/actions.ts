'use server'

import { updateProfile } from '@/http/update-profile'
import { revalidateTag } from 'next/cache'
import { HTTPError } from 'ky'
import { ProfileSchema } from './schemas'

export async function updateProfileAction(data: ProfileSchema) {
  const { name, email } = data

  try {
    await updateProfile({ name, email })
    revalidateTag('profile')
    return {
      success: true,
      message: 'Successfully saved the profile.',
    }
  } catch (err) {
    const defaultErrorMessage = 'Unexpected error, try again in a few minutes.'

    const errorMessage =
      err instanceof HTTPError
        ? (await err.response
            .json()
            .then((res) => res.title)
            .catch(() => null)) || defaultErrorMessage
        : defaultErrorMessage

    return {
      success: false,
      message: errorMessage,
    }
  }
}
