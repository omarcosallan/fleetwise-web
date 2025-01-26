'use client'

import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import type { User } from 'next-auth'
import { useSession } from 'next-auth/react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

import { getNameInitials } from '@/utils/get-name-initials'

import { ROLES } from '@/types/roles'
import { updateUserAction } from '@/app/(private)/settings/profile/actions'

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  roles: z.array(z.enum(ROLES)).refine((value) => value.length > 0, {
    message: 'You must select at least one role.',
  }),
})

export type UserSchema = z.infer<typeof userSchema>

interface ProfileFormProps {
  user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { update } = useSession()
  const { refresh } = useRouter()

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user.id,
      name: user.name || '',
      email: user.email || '',
      roles: user.roles || [],
    },
  })

  async function onSubmit(data: UserSchema) {
    const { name, email, roles } = data

    try {
      await updateUserAction(data)

      await update({
        user: {
          name,
          email,
          roles,
        },
      })

      refresh()

      form.reset(data)

      toast.success('Profile has been updated.')
    } catch {
      toast.error('Uh oh! Something went wrong.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <div className="space-y-4">
          <Avatar className="w-24 h-24 mx-auto cursor-not-allowed">
            <AvatarImage src={user.image as string} alt="User avatar" />
            <AvatarFallback>
              {getNameInitials(user.name as string)}
            </AvatarFallback>
          </Avatar>
          <FormDescription className="text-center">
            O upload de avatar está desativado no momento.
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Roles</FormLabel>
              </div>
              {ROLES.map((role) => (
                <FormField
                  key={role}
                  control={form.control}
                  name="roles"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={role}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(role)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, role])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== role,
                                    ),
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {role}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="ml-auto"
          size="sm"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Salvar alterações'
          )}
        </Button>
      </form>
    </Form>
  )
}
