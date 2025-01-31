import { ability } from '@/auth/casl'

import { CreateDepartment } from '@/components/create-department'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'

export default async function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const permissions = await ability()

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Secretarias</PageHeaderHeading>
      </PageHeader>
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="flex items-center gap-3">
            {permissions?.can('create', 'Department') && <CreateDepartment />}
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
