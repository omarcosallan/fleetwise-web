'use client'

import { Loader2 } from 'lucide-react'
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

import { ROLES, type RoleArray } from '@/lib/casl'

import { updateUserAction } from '@/app/(private)/settings/profile/actions'

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, {
    message: 'O nome deve ter pelo menos 3 caracteres.',
  }),
  email: z.string().email({
    message: 'Insira um endereço de e-mail válido.',
  }),
  roles: z.array(z.enum(ROLES)).refine((value) => value.length > 0, {
    message: 'Você deve selecionar pelo menos uma função.',
  }),
})

export type UserSchema = z.infer<typeof userSchema>

interface ProfileFormProps {
  user: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    roles: RoleArray
  }
  cannotUpdateUser: boolean | undefined
}

export function ProfileForm({ user, cannotUpdateUser }: ProfileFormProps) {
  const { data: session, update } = useSession()
  const currentUserRoles = session?.user?.roles || []

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user.id || '',
      name: user.name || '',
      email: user.email || '',
      roles: user.roles || [],
    },
  })

  async function handleSubmit(data: UserSchema) {
    const { name, email, roles } = data

    try {
      const result = await updateUserAction(data)

      await update({
        user: {
          name,
          email,
          roles,
        },
      })

      if (result.success) {
        toast.success('Seu perfil foi atualizado.')

        form.reset(data)
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error('Ah, ah! Algo deu errado.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
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
                <Input
                  placeholder="John Doe"
                  {...field}
                  disabled={cannotUpdateUser}
                />
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
                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...field}
                  disabled={cannotUpdateUser}
                />
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
                    const isDisabled =
                      role === 'ROLE_MODERATOR' &&
                      !currentUserRoles.includes('ROLE_MODERATOR') &&
                      currentUserRoles.includes('ROLE_ADMIN')

                    return (
                      <FormItem
                        key={role}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(role)}
                            disabled={isDisabled || cannotUpdateUser}
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
          disabled={
            form.formState.isSubmitting ||
            !form.formState.isDirty ||
            cannotUpdateUser
          }
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
