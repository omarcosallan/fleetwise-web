'use server'

import { Role } from '@/lib/casl'
import { revalidateTag } from 'next/cache'

import { createInvite } from '@/http/create-invite'
import { getCurrentOrg } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'
import { transferOrganization } from '@/http/transfer-organization'

import { InviteSchema } from './schemas'
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

    return {
      success: true,
      message: 'Successfully created the invited.',
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
