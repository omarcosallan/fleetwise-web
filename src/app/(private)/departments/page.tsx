import { ability } from '@/auth/casl'

import { Filters } from '@/components/filters'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { DepartmentList } from './department-list'
import { CreateDepartment } from '@/components/create-department'

import { Metadata } from 'next'

import { z } from 'zod'
import { Suspense } from 'react'
import DepartmentListSkeleton from '../../../components/department-list-skeleton'

export const metadata: Metadata = {
  title: 'Secretarias',
}

const pageSearchParams = z.object({
  sortBy: z.string().optional(),
  search: z.string().optional(),
})

type PageSearchParams = z.infer<typeof pageSearchParams>

export default async function DepartmentsPage({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>
}) {
  const { sortBy, search } = pageSearchParams.parse(await searchParams)

  const permissions = await ability()

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Secretarias</PageHeaderHeading>
      </PageHeader>
      <div className="container-wrapper h-full flex-1">
        <div className="container py-6 flex-grow">
          <div className="flex flex-col items-center sm:flex-row gap-3">
            <Filters />
            {permissions?.can('create', 'Department') && <CreateDepartment />}
          </div>
          <Suspense fallback={<DepartmentListSkeleton />}>
            <DepartmentList sortBy={sortBy} search={search} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
