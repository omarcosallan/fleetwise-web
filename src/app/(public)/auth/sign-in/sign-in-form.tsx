'use client'

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

import { SignInButton } from './sign-in-button'

import { signInWithEmailAction } from './actions'
import { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignInForm() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: SignInSchema) {
    const { email, password } = data
    try {
      const result = await signInWithEmailAction({ email, password })

      if (!result.success) {
        toast.error(result.message)
      }

      router.push('/')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="joe@example.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-0 top-0 hover:bg-inherit"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-muted-foreground" />
                    ) : (
                      <Eye className="size-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SignInButton />
      </form>
    </Form>
  )
}
