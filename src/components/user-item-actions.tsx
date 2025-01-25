'use client'

import { useRouter } from 'next/navigation'

import { MoreHorizontal } from 'lucide-react'
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

import { removeUserAction } from '@/app/(private)/settings/users/actions'

interface UserItemActionsProps {
  id: string
  canRemoveUser?: boolean
}

export function UserItemActions({
  id,
  canRemoveUser = true,
}: UserItemActionsProps) {
  const router = useRouter()

  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)

  async function handleRemoveUser() {
    try {
      await removeUserAction({ id })

      setIsRemoveDialogOpen(false)

      router.refresh()
    } catch (err) {
      console.log(err)
      toast.error('Uh oh! Something went wrong.')
    }
  }

  return (
    <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="data-[state=open]:bg-muted group/toggle h-8 w-8 px-0"
          >
            <MoreHorizontal className="size-3" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-10" forceMount>
          <DropdownMenuItem>Editar</DropdownMenuItem>

          <DropdownMenuSeparator />

          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="text-red-500 data-[highlighted]:text-red-500 dark:text-red-400 dark:data-[highlighted]:text-red-400"
              disabled={!canRemoveUser}
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
            Esta ação não pode ser desfeita e o usuário{' '}
            <span className="font-semibold text-foreground">{id}</span> será
            excluído dessa organização.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button size="sm" variant="ghost">
              Cancelar
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={!canRemoveUser}
            variant="destructive"
            size="sm"
            onClick={handleRemoveUser}
          >
            Remover
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
