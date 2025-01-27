import { z } from 'zod'

export const departmentSchema = z.object({
  __typename: z.literal('Department').default('Department'),
  id: z.string(),
  name: z.string(),
})

export type Deparment = z.infer<typeof departmentSchema>
