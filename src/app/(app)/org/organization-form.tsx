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

import { createOrganizationAction, updateOrganizationAction } from './actions'

import { organizationSchema, OrganizationSchema } from './schemas'

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
                <FormLabel>E-mail domain</FormLabel>
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
