import { Metadata } from 'next'
import DashboardPage from './(dashboard)/page'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export const revalidate = 900

export default async function HomePage() {
  return <DashboardPage />
}
