import { ability } from '@/auth/casl'

import { getDepartments } from '@/http/get-departments'
import { getNameInitials } from '@/utils/get-name-initials'

import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { CreateDepartment } from './create-department'

export async function DepartmentsList() {
  const departments = await getDepartments()

  const permissions = await ability()
  const canDeleteDepartment = permissions?.can('delete', 'Department')

  return (
    <>
      {departments && departments.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 sm:gap-6">
          {departments.map((department) => (
            <Card
              key={department.id}
              className="relative hover:border-card-foreground/30 flex flex-col justify-between gap-3"
            >
              <Link
                href={`/departments/${department.slug}`}
                className="absolute inset-0 z-10"
              />
              <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <Avatar>
                    <AvatarFallback>
                      {getNameInitials(department.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <CardTitle className="text-sm font-normal">
                      {department.name}
                    </CardTitle>
                    <CardDescription className="truncate">
                      {department.slug}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground shrink-0 relative z-20"
                  disabled={!canDeleteDepartment}
                >
                  <Ellipsis />
                </Button>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      department.active ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                    aria-label={department.active ? 'Active' : 'Inactive'}
                  />
                  <p className="text-sm text-muted-foreground">
                    {department.active ? 'Ativo' : 'Inativo'}
                  </p>
                </div>
                <p className="text-sm font-normal text-muted-foreground">
                  {new Date(department.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="min-h-96 flex flex-col items-center justify-center gap-6 mt-8 rounded-lg border border-dashed text-sm">
          <div className="flex flex-col items-center gap-2">
            <p>Nenhum resultado encontrado</p>
            <p className="text-muted-foreground">
              Sua busca não retornou nenhum resultado.
            </p>
          </div>

          <CreateDepartment />
        </div>
      )}
    </>
  )
}
