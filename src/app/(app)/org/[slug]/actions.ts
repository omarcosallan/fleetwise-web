'use server'

import { revalidateTag } from 'next/cache'
import { VehicleSchema } from '../vehicle-form'
import { HTTPError } from 'ky'

import { getCurrentOrg } from '@/auth/auth'

import { createVehicle } from '@/http/create-vehicle'

export async function createVehicleAction(data: VehicleSchema) {
  const currentOrg = await getCurrentOrg()

  const {
    manufacturer,
    manufacturingYear,
    active,
    rented,
    plate,
    register,
    model,
  } = data

  try {
    await createVehicle({
      org: currentOrg!,
      manufacturer,
      manufacturingYear,
      active,
      rented,
      plate,
      register,
      model,
    })

    revalidateTag(`${currentOrg}vehicles`)
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
