'use server'

import { updateProfile } from '@/http/update-profile'
import { revalidateTag } from 'next/cache'
import { ProfileSchema } from './profile-form'
import { HTTPError } from 'ky'

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
