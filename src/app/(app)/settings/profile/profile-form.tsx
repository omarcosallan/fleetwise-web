'use client'

import Image from 'next/image'

import { Avatar } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
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

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { updateProfileAction } from './actions'

import { profileSchema, ProfileSchema } from './schemas'

interface ProfileFormProps {
  initialData: ProfileSchema
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: ProfileSchema) {
    try {
      const result = await updateProfileAction(data)
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
        <div className="inline-block space-y-2">
          <Label>Avatar</Label>
          <Avatar className="size-16 overflow-visible">
            {initialData.avatarUrl ? (
              <Image
                className="aspect-square size-full rounded-full ring-1 ring-muted"
                src={initialData.avatarUrl}
                width={64}
                height={64}
                alt=""
              />
            ) : (
              <div className="aspect-square size-full bg-accent" />
            )}
          </Avatar>
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input disabled type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar image</FormLabel>
                <FormControl>
                  <Input type="url" {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Update profile'
          )}
        </Button>
      </form>
    </Form>
  )
}
