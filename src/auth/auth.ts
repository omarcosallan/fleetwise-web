import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'
import { getMembership } from '@/http/get-membership'

import { defineAbilityFor } from '@/lib/casl'

export async function isAuthenticated() {
  return !!(await cookies()).get(process.env.TOKEN_NAME!)?.value
}

export async function getCurrentOrg() {
  return (await cookies()).get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const membership = await getMembership(org)

  return membership
}

export async function auth() {
  const allCookies = await cookies()
  const token = allCookies.get(process.env.TOKEN_NAME!)?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const user = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}
