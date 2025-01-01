import { validateVehicleRegistration } from '@/utils/validate-vehicle-register'
import { z } from 'zod'

export const vehicleSchema = z
  .object({
    model: z
      .string()
      .min(3, { message: 'Please, incluide at least least 3 characters.' }),
    manufacturer: z
      .string({ required_error: 'The vehicle manufacturer is required.' })
      .min(3, { message: 'Please, incluide at least least 3 characters.' }),
    manufacturingYear: z.coerce
      .number()
      .min(2000, { message: 'The manufacturing year must be 2000 or later.' }),
    plate: z
      .string({ required_error: 'The vehicle plate is required.' })
      .min(7, { message: 'Please, incluide at least least 7 characters.' })
      .regex(/^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/, {
        message:
          'The plate format is invalid. It should follow the pattern: ABC1D23.',
      })
      .transform((value) => value.toUpperCase()),
    register: z
      .string({
        required_error:
          'The vehicle registration number (Renavam) is required.',
      })
      .min(9, { message: 'Please, incluide at least least 9 characters.' })
      .max(11, {
        message: 'The registration number can have a maximum of 11 characters.',
      })
      .transform((value) => value.padStart(11, '0'))
      .refine(
        (value) => {
          const isValid = validateVehicleRegistration(value)
          return isValid
        },
        { message: 'The registration number (Renavam) is invalid.' },
      ),
    active: z.boolean().default(true),
    rented: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.rented === true && data.active === false) {
        return false
      }
      return true
    },
    {
      message: 'A rented vehicle must be active.',
      path: ['active'],
    },
  )

export type VehicleSchema = z.infer<typeof vehicleSchema>
