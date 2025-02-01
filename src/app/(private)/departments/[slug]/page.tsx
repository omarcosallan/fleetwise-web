import { ability } from '@/auth/casl'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UpdateDepartmentStatus } from '@/components/update-department-status'

import { getDepartment } from '@/http/get-department'
import { getNameInitials } from '@/utils/get-name-initials'

import type { Metadata } from 'next'

interface DepartmentSlugPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: DepartmentSlugPageProps): Promise<Metadata> {
  const { slug } = await params

  return {
    title: `${slug}`,
  }
}

export default async function DepartmentSlugPage({
  params,
}: DepartmentSlugPageProps) {
  const { slug } = await params

  const department = await getDepartment({ slug })

  const permissions = await ability()
  const canUpdateDepartment = permissions?.can('update', 'Department')

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{slug}</PageHeaderHeading>
      </PageHeader>
      <div className="container-wrapper pt-6">
        <div className="container flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
              Detalhes
            </h1>
          </div>

          <Card className="flex flex-col sm:flex-row p-6">
            <CardHeader className="bg-muted-foreground/10 w-full sm:max-w-[430px] justify-center items-center p-2 border rounded-lg">
              <Avatar>
                <AvatarFallback>
                  {getNameInitials(department.name)}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full gap-6 pb-0">
              <div className="text-sm mb-2">
                <p className="text-muted-foreground">Slug</p>
                <p className="font-medium">{department.slug}</p>
              </div>

              <div className="text-sm mb-2">
                <p className="text-muted-foreground">Nome</p>
                <p className="font-medium">{department.name}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-sm mb-2">
                  <p className="text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        department.active ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                      aria-label={department.active ? 'Active' : 'Inactive'}
                    />
                    <p>{department.active ? 'Ativo' : 'Inativo'}</p>
                  </div>
                </div>

                <div className="text-sm mb-2">
                  <p className="text-muted-foreground">Criado em</p>

                  <p>
                    {new Date(department.createdAt).toLocaleDateString(
                      'pt-BR',
                      {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      },
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-between sm:flex-row gap-2 p-6">
            <div className="flex items-center gap-6 text-sm">
              <p className="text-muted-foreground">{department.slug}</p>
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    department.active ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  aria-label={department.active ? 'Active' : 'Inactive'}
                />
                <p>{department.active ? 'Ativo' : 'Inativo'}</p>
              </div>
            </div>

            <UpdateDepartmentStatus
              slug={department.slug}
              status={department.active}
              canUpdateDepartment={canUpdateDepartment}
            />
          </Card>
        </div>
      </div>
    </>
  )
}
