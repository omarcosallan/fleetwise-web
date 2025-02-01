'use server'

import { updateDepartmentStatus } from '@/http/update-department-status'
import { getErrorState } from '@/utils/get-error-state'

import { revalidateTag } from 'next/cache'

export async function updateDepartmentStatusAction({
  slug,
  active,
}: {
  slug: string
  active: boolean
}) {
  try {
    await updateDepartmentStatus({ slug, active })

    revalidateTag(`department/${slug}`)

    return {
      success: true,
      message: '',
    }
  } catch (error) {
    return await getErrorState(error)
  }
}
