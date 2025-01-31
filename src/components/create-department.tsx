'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

import { Plus } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createDepartmentAction } from '@/app/(private)/departments/actions'

export const departmentSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Por favor, inclua pelo menos 4 caracteres.' })
    .max(32, { message: 'Por favor, inclua no máximo 32 caracteres.' }),
  active: z.coerce.boolean().default(true),
})

export type DepartmentSchema = z.infer<typeof departmentSchema>

export function CreateDepartment() {
  const form = useForm<DepartmentSchema>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: '',
    },
    shouldFocusError: true,
  })

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  async function onSubmit(data: DepartmentSchema) {
    const { name } = data

    try {
      const result = await createDepartmentAction({ name })

      if (result?.success) {
        toast.success('A secretaria foi criada.')

        form.reset()
      } else {
        toast.error(result?.message)
      }
    } catch {
      toast.error('Ah, ah! Algo deu errado.')
    }
  }

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          <span>Criar secretaria</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Criar secretaria</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua secretaria aqui" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>

              <Button type="submit">Criar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
