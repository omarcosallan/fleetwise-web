'use client'

import { Loader2 } from 'lucide-react'
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

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { createOrganizationAction, updateOrganizationAction } from './actions'

const organizationSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Please, incluide at least 4 characters.' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

            return domainRegex.test(value)
          }

          return true
        },
        {
          message: 'Please, enter a valid domain.',
        },
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    },
  )

export type OrganizationSchema = z.infer<typeof organizationSchema>

interface OrganizationFormProps {
  isUpdating?: boolean
  initialData?: OrganizationSchema
}

export function OrganizationForm({
  isUpdating = false,
  initialData,
}: OrganizationFormProps) {
  const form = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    defaultValues: initialData || {
      name: '',
      domain: '',
      shouldAttachUsersByDomain: false,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: OrganizationSchema) {
    const formAction = isUpdating
      ? updateOrganizationAction
      : createOrganizationAction

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
        <div className="space-y-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-1">
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-1">
          <FormField
            control={form.control}
            name="shouldAttachUsersByDomain"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl className="translate-y-0.5">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="space-y-1">
                  <span className="text-sm font-medium leading-none">
                    Auto-join new members
                  </span>
                  <p className="text-sm text-muted-foreground">
                    This will automatically invite all members with same e-mail
                    domain to this organization.
                  </p>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Save organization'
          )}
        </Button>
      </form>
    </Form>
  )
}
