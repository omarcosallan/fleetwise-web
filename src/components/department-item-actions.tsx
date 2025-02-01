'use client'

import { MoreHorizontal } from 'lucide-react'

import Link from 'next/link'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

import { deleteDepartmentAction } from '@/app/(private)/departments/actions'

interface DepartmentItemActionsProps {
  slug: string
  canDeleteDepartment: boolean | undefined
}

export function DepartmentItemActions({
  slug,
  canDeleteDepartment = true,
}: DepartmentItemActionsProps) {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)

  async function handleDeleteDepartment() {
    try {
      const result = await deleteDepartmentAction({ slug })

      setIsRemoveDialogOpen(false)

      if (!result.success) {
        toast.error(result.message)
      }
    } catch {
      toast.error('Ah, ah! Algo deu errado.')
    }
  }

  return (
    <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="data-[state=open]:bg-muted group/toggle h-8 w-8 px-0 text-muted-foreground shrink-0 relative z-20"
          >
            <MoreHorizontal className="size-3" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-10" forceMount>
          <DropdownMenuItem>
            <Link
              href={`departments/${slug}`}
              prefetch={false}
              className="w-full"
            >
              Editar
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="text-red-500 data-[highlighted]:text-red-500 dark:text-red-400 dark:data-[highlighted]:text-red-400"
              disabled={!canDeleteDepartment}
            >
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            Esta ação não pode ser desfeita e a secretaria{' '}
            <span className="font-semibold text-foreground">{slug}</span> será
            excluída dessa organização, juntamente com seus veículos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button size="sm" variant="destructive">
              Cancelar
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={!canDeleteDepartment}
            variant="destructive"
            size="sm"
            onClick={handleDeleteDepartment}
          >
            Remover
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
