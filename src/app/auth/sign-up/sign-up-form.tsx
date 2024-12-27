'use client'

import Link from 'next/link'

import { Loader2 } from 'lucide-react'
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
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { signUpAction } from './actions'
import { useRouter } from 'next/navigation'

export const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, enter your full name',
    }),
    email: z
      .string()
      .email({ message: 'Please, provide a valid e-mail address.' }),
    password: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match.',
    path: ['password_confirmation'],
  })

export type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUpForm() {
  const router = useRouter()

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: SignUpSchema) {
    const result = await signUpAction(data)

    if (result.success) {
      router.push('/auth/sign-in')
      toast.success('User created successfully.')
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
                <FormLabel>Name</FormLabel>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-1">
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
        </div>

        <div className="space-y-1">
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
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
            'Create account'
          )}
        </Button>

        <Separator />

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-in">Already registered? Sign In</Link>
        </Button>
      </form>
    </Form>
  )
}
