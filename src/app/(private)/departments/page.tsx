import { DepartmentsList } from '@/components/department-list'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secretarias',
}

export default async function DepartmentsPage() {
  return (
    <>
      <DepartmentsList />
    </>
  )
}
