import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function DepartmentListSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 sm:gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-2">
            <div className="flex items-start gap-2 min-w-0">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="min-w-0 space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
            </div>
            <Skeleton className="h-9 w-9 rounded-full" />
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-3 w-[50px]" />
            </div>
            <Skeleton className="h-3 w-[100px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
