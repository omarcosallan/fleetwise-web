'use server'

import { revalidateTag } from 'next/cache'
import { OrganizationSchema } from './organization-form'
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
    message: 'Successfully saved the organization.',
    errors: null,
  }
}

export async function updateOrganizationAction(data: OrganizationSchema) {
  const currentOrg = await getCurrentOrg()

  if (!currentOrg) {
    return {
      success: false,
      message: 'Current organization is not available.',
      errors: null,
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
    message: 'Successfully saved the organization.',
    errors: null,
  }
}
