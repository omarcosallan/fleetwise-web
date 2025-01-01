'use server'

import { revalidateTag } from 'next/cache'
import { VehicleSchema } from './vehicle-form'
import { HTTPError } from 'ky'

import { getCurrentOrg } from '@/auth/auth'

import { createVehicle } from '@/http/create-vehicle'
import { updateVehicle } from '@/http/update-vehicle'

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

    return {
      success: true,
      message: 'Successfully saved the vehicle.',
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

export async function updateVehicleAction(data: VehicleSchema) {
  const currentOrg = await getCurrentOrg()

  const { manufacturer, manufacturingYear, active, rented, plate, model } = data

  try {
    await updateVehicle({
      org: currentOrg!,
      manufacturer,
      manufacturingYear,
      active,
      rented,
      model,
      plate,
    })

    revalidateTag(`${currentOrg}vehicles`)

    return {
      success: true,
      message: 'Successfully saved the vehicle.',
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
