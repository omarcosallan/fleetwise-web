'use server'

import { createDepartment } from '@/http/create-department'
import { getErrorState } from '@/utils/get-error-state'

import { revalidateTag } from 'next/cache'

export async function createDepartmentAction({ name }: { name: string }) {
  try {
    await createDepartment({ name })

    revalidateTag('departments')

    return {
      success: true,
      message: '',
    }
  } catch (error) {
    return await getErrorState(error)
  }
}
