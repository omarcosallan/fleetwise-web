'use server'

import { Role } from '@/lib/casl'
import { revalidateTag } from 'next/cache'

import { createInvite } from '@/http/create-invite'
import { getCurrentOrg } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'
import { transferOrganization } from '@/http/transfer-organization'

import { InviteSchema } from './create-invite-form'
import { HTTPError } from 'ky'

export async function createInviteAction(data: InviteSchema) {
  const currentOrg = await getCurrentOrg()

  const { email, role } = data

  try {
    await createInvite({
      org: currentOrg!,
      email,
      role,
    })

    revalidateTag(`${currentOrg}/invites`)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { title } = await err.response.json()
      return { success: false, message: title, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully created the invite.',
    errors: null,
  }
}

export async function transferOrganizationAction(memberId: string) {
  const currentOrg = await getCurrentOrg()

  await transferOrganization({
    org: currentOrg ?? '',
    memberId,
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()

  await removeMember({
    org: currentOrg ?? '',
    memberId,
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()

  await updateMember({
    org: currentOrg ?? '',
    memberId,
    role,
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg()

  await revokeInvite({
    org: currentOrg ?? '',
    inviteId,
  })

  revalidateTag(`${currentOrg}/invites`)
}
