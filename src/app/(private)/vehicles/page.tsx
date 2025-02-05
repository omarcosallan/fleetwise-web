import { VehicleFilters } from '@/components/vehicle-filters'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'

import { Metadata } from 'next'

import { z } from 'zod'
import { Suspense } from 'react'

import { VehicleList } from './vehicle-list'

export const metadata: Metadata = {
  title: 'Veículos',
}

const pageSearchParams = z.object({
  sortBy: z.string().optional(),
  search: z.string().optional(),
  order: z.string().optional(),
  pageIndex: z.coerce.number().default(0),
  pageSize: z.coerce.number().default(10),
})

type PageSearchParams = z.infer<typeof pageSearchParams>

export default async function DepartmentsPage({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>
}) {
  const { sortBy, search, order, pageIndex, pageSize } = pageSearchParams.parse(
    await searchParams,
  )

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Veículos</PageHeaderHeading>
      </PageHeader>
      <div className="container-wrapper h-full flex-1">
        <div className="container py-6 flex-grow">
          <div className="flex flex-col items-center sm:flex-row gap-3">
            <VehicleFilters />
          </div>
          <Suspense fallback={null}>
            <VehicleList
              sortBy={sortBy}
              search={search}
              order={order}
              pageIndex={pageIndex}
              pageSize={pageSize}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}
