'use client'

import { Loader2 } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { SheetClose } from './ui/sheet'

import { ROLES } from '@/lib/casl'

import { useSession } from 'next-auth/react'

import { createUserAction } from '@/app/(private)/settings/users/actions'

const registerSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome deve ter pelo menos 3 caracteres.',
  }),
  email: z.string().email({
    message: 'Insira um endereço de e-mail válido.',
  }),
  password: z.string().min(8, {
    message: 'A senha deve ter pelo menos 8 caracteres.',
  }),
  roles: z.array(z.enum(ROLES)).refine((value) => value.length > 0, {
    message: 'Você deve selecionar pelo menos uma função.',
  }),
})

export type RegisterSchema = z.infer<typeof registerSchema>

export function RegisterForm() {
  const { data: session } = useSession()
  const currentUserRoles = session?.user?.roles || []

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      roles: ['ROLE_USER'],
    },
  })

  async function handleSubmit(data: RegisterSchema) {
    try {
      const result = await createUserAction(data)

      if (result?.success) {
        toast.success('O usuário foi criado.')

        form.reset()
      } else {
        toast.error(result?.message)
      }
    } catch {
      toast.error('Ah, ah! Algo deu errado.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-4"
      >
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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
              <FormLabel>Roles</FormLabel>
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
                            disabled={isDisabled}
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
                        <FormLabel className="cursor-pointer">{role}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="ml-auto space-x-2">
          <SheetClose asChild>
            <Button type="button" size="sm" variant="ghost">
              Cancelar
            </Button>
          </SheetClose>
          <Button
            type="submit"
            size="sm"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
