import { api } from './api-client'

export async function removeUser({ id }: { id: string }) {
  const result = await api.delete(`users/${id}`)

  return result
}
