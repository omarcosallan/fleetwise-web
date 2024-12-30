import { Skeleton } from '@/components/ui/skeleton'

export default async function Loading() {
  return (
    <>
      <div className="space-y-4">
        <div className="">
          <Skeleton className="h-28 w-full" />
        </div>

        <Skeleton className="h-32 w-full" />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Invites</h2>

          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </>
  )
}
