'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

import { validateVehicleRegistration } from '@/utils/validate-vehicle-register'

import { Check, Loader2 } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createVehicleAction, updateVehicleAction } from './[slug]/actions'

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

interface VehicleFormProps {
  isUpdating?: boolean
  initialData?: VehicleSchema
}

export function VehicleForm({
  isUpdating = false,
  initialData,
}: VehicleFormProps) {
  const form = useForm<VehicleSchema>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData || {
      active: true,
      rented: false,
      manufacturer: '',
      manufacturingYear: 1999,
      model: '',
      plate: '',
      register: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: VehicleSchema) {
    const formAction = isUpdating ? updateVehicleAction : createVehicleAction

    const result = await formAction(data)

    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="Camry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer</FormLabel>
                <FormControl>
                  <Input placeholder="Toyota" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manufacturingYear"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plate</FormLabel>
                <FormControl>
                  <Input
                    placeholder="XYZ1234"
                    disabled={isUpdating}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="register"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Register</FormLabel>
                <FormControl>
                  <Input
                    placeholder="00123456789"
                    disabled={isUpdating}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-end space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Active</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rented"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-end space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormLabel>Rented</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 size-3 animate-spin" />
          ) : (
            <Check className="mr-2 size-3" />
          )}
          Save vehicle
        </Button>
      </form>
    </Form>
  )
}
