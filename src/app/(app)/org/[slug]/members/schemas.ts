import { roleSchema } from '@/lib/casl'
import { z } from 'zod'

export const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address.' }),
  role: roleSchema,
})

export type InviteSchema = z.infer<typeof inviteSchema>
