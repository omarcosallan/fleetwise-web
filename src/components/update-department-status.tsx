'use client'

import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { updateDepartmentStatusAction } from '@/app/(private)/departments/[slug]/actions'
import { toast } from 'sonner'

interface UpdateDepartmentStatusProps {
  slug: string
  status: boolean
  canUpdateDepartment?: boolean
}

export function UpdateDepartmentStatus({
  slug,
  status,
  canUpdateDepartment = true,
}: UpdateDepartmentStatusProps) {
  const [active, setActive] = useState(status)

  async function handleUpdateStatus(value: string) {
    const newStatus = value === 'true'

    if (newStatus !== active) {
      setActive(newStatus)

      try {
        const result = await updateDepartmentStatusAction({
          slug,
          active: newStatus,
        })

        if (!result.success) {
          toast.error(result.message)
          setActive(active) // Reverte o estado caso falhe
        }
      } catch {
        toast.error('Ah, ah! Algo deu errado.')
        setActive(active)
      }
    }
  }

  return (
    <Select
      value={String(active)}
      onValueChange={handleUpdateStatus}
      disabled={!canUpdateDepartment}
    >
      <SelectTrigger className="w-full sm:max-w-[180px]">
        <SelectValue placeholder={active ? 'Ativado' : 'Desativado'} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="true">Ativo</SelectItem>
        <SelectItem value="false">Inativo</SelectItem>
      </SelectContent>
    </Select>
  )
}
