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

import { Check, Loader2 } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { createVehicleAction, updateVehicleAction } from './actions'

import { vehicleSchema, VehicleSchema } from './schemas'

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

    try {
      const result = await formAction(data)
      const toastFn = result.success ? toast.success : toast.error
      toastFn(result.message)
    } catch (err) {
      toast.error('An unexpected error occurred.')
      console.error(err)
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
