import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export async function isAuthenticated() {
  return !!(await cookies()).get(process.env.TOKEN_NAME!)?.value
}

export async function auth() {
  const allCookies = await cookies()
  const token = allCookies.get(process.env.TOKEN_NAME!)?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
