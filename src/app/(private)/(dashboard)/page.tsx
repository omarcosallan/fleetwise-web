import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getDepartmentsAmountSummary } from '@/http/get-departments-amount-summary'
import { BarChart } from 'lucide-react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const { amountLastMonth, amountOverall } = await getDepartmentsAmountSummary()

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>
      <div className="container-wrapper h-full flex-1">
        <div className="container py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 sm:gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">
                  Secretarias
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-1">
                <span className="text-2xl font-bold">{amountOverall}</span>
                <p className="text-xs text-muted-foreground">
                  + {amountLastMonth} nos últimos 30 dias
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
