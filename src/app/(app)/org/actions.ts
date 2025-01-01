'use server'

import { revalidateTag } from 'next/cache'

import { OrganizationSchema } from './schemas'
import { HTTPError } from 'ky'

import { getCurrentOrg } from '@/auth/auth'
import { createOrganization } from '@/http/create-organization'
import { updateOrganization } from '@/http/update-organization'

export async function createOrganizationAction(data: OrganizationSchema) {
  const { name, domain, shouldAttachUsersByDomain } = data

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    revalidateTag('organizations')

    return {
      success: true,
      message: 'Successfully saved the organization.',
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

export async function updateOrganizationAction(data: OrganizationSchema) {
  const currentOrg = await getCurrentOrg()

  if (!currentOrg) {
    return {
      success: false,
      message: 'Current organization is not available.',
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = data

  try {
    await updateOrganization({
      org: currentOrg,
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    revalidateTag('organizations')

    return {
      success: true,
      message: 'Successfully saved the organization.',
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
