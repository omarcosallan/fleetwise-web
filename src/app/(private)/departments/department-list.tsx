import { ability } from '@/auth/casl'
import Link from 'next/link'

import { getDepartments } from '@/http/get-departments'
import { getNameInitials } from '@/utils/get-name-initials'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { DepartmentItemActions } from '@/components/department-item-actions'
import { CreateDepartment } from '@/components/create-department'

interface DepartmentListProps {
  sortBy: string | undefined
  search: string | undefined
}

export async function DepartmentList({ sortBy, search }: DepartmentListProps) {
  const departments = await getDepartments({ sortBy, search })

  const permissions = await ability()
  const canDeleteDepartment = permissions?.can('delete', 'Department')

  return (
    <>
      {departments && departments.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 sm:gap-6">
          {departments.map((department) => (
            <Card
              key={department.id}
              className="relative hover:border-card-foreground/30 transition-all flex flex-col justify-between gap-3"
            >
              <Link
                href={`/departments/${department.slug}`}
                className="absolute inset-0 z-10"
              />
              <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <Avatar>
                    <AvatarFallback>
                      {getNameInitials(
                        department.name.replaceAll('Secretaria de', ''),
                      )}
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
                <DepartmentItemActions
                  slug={department.slug}
                  canDeleteDepartment={canDeleteDepartment}
                />
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
              {`Sua busca por "${search ?? ''}" não retornou nenhum resultado.`}
            </p>
          </div>

          <CreateDepartment />
        </div>
      )}
    </>
  )
}
