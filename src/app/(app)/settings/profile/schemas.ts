import { z } from 'zod'

export const profileSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  name: z.string().refine((value) => value.split(' ').length > 1, {
    message: 'Please, enter your full name',
  }),
  avatarUrl: z.string().url().nullable().optional(),
})

export type ProfileSchema = z.infer<typeof profileSchema>
