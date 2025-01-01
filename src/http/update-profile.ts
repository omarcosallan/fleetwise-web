import { api } from './api-client'

interface UpdateProfileRequest {
  name: string
  email: string
}

type UpdateProfileResponse = undefined

export async function updateProfile({
  name,
  email,
}: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  await api.put('users', {
    json: {
      name,
      email,
    },
  })
}
