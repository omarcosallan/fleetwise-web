import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getAmountSummary } from '@/http/get-amount-summary'
import { BarChart } from 'lucide-react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const summary = await getAmountSummary()

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>
      <div className="container-wrapper h-full flex-1">
        <div className="container py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 sm:gap-6">
            <div className="sm:col-span-2 lg:col-span-2 gap-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 sm:gap-6">
                {summary.map((s) => {
                  return (
                    <Card key={s.entity}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">
                          {s.entity}
                        </CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent className="space-y-1">
                        <span className="text-2xl font-bold">
                          {s.amountOverall}
                        </span>
                        {s.amountLastMonth && (
                          <p className="text-xs text-muted-foreground">
                            + {s.amountLastMonth} nos últimos 30 dias
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
            <div>{/* Recent activity */}</div>
          </div>
        </div>
      </div>
    </>
  )
}
