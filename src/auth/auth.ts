import { cookies } from 'next/headers'

export async function isAuthenticated() {
  return !!(await cookies()).get('fleet-wise-cookies-session-token')?.value
}
