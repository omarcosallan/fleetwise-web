'use server'

import { signIn } from '@/auth/auth'
import { z } from 'zod'

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function signInWithEmailAction(data: FormData) {
  const { email, password } = signInFormSchema.parse(Object.fromEntries(data))

  await signIn('credentials', {
    email,
    password,
    redirectTo: '/',
  })
}
