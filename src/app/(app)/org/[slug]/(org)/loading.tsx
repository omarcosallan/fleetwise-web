import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function Loading() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Brand/Manufacturer</TableHead>
            <TableHead style={{ width: 100 }}>Plate</TableHead>
            <TableHead style={{ width: 120 }}>Register</TableHead>
            <TableHead style={{ width: 80 }}>Status</TableHead>
            <TableHead style={{ width: 120 }}>Rented</TableHead>
            <TableHead style={{ width: 200 }}>Created at</TableHead>
            <TableHead style={{ width: 64 }} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, row) => {
            return (
              <TableRow key={row}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-[160px]" />
                    <Skeleton className="h-4 w-[240px]" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
