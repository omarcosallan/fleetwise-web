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

import { ROLES } from '@/types/roles'

import { createUserAction } from '../app/(private)/settings/users/actions'
import { SheetClose } from './ui/sheet'

const registerSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  roles: z.array(z.enum(ROLES)).refine((value) => value.length > 0, {
    message: 'You must select at least one role.',
  }),
})

export type RegisterSchema = z.infer<typeof registerSchema>

export function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      roles: [],
    },
  })

  async function onSubmit(data: RegisterSchema) {
    try {
      await createUserAction(data)

      toast.success('User has been created.')
    } catch {
      toast.error('Uh oh! Something went wrong.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
