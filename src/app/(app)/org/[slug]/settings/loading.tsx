import { Skeleton } from '@/components/ui/skeleton'

export default async function Loading() {
  return (
    <>
      <div className="space-y-4">
        <Skeleton className="h-96 w-full" />

        <Skeleton className="h-40 w-full" />
      </div>
    </>
  )
}
