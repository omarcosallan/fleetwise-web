import { Metadata } from 'next'

import { Suspense } from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { ability, getCurrentOrg } from '@/auth/auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { getVehicles } from '@/http/get-vehicles'

import { getNameInitials } from '@/utils/get-name-initials'
import { UpdateVehicle } from './update-vehicle'
import { VehiclesPagination } from './vehicles-pagination'

import { z } from 'zod'

dayjs.extend(relativeTime)

export const metadata: Metadata = {
  title: 'Vehicles',
}

const vehiclesPageSearchParams = z.object({
  pageIndex: z.coerce.number().default(0),
  pageSize: z.coerce.number().default(10),
  search: z.string().optional(),
})

type VehiclesPageSearchParams = z.infer<typeof vehiclesPageSearchParams>

export default async function OrgPage({
  searchParams,
}: {
  searchParams: Promise<VehiclesPageSearchParams>
}) {
  const { pageIndex, pageSize, search } = vehiclesPageSearchParams.parse(
    await searchParams,
  )

  const currentOrg = await getCurrentOrg()
  const { vehicles, pageCount } = await getVehicles({
    org: currentOrg!,
    pageSize,
    pageIndex,
    search,
  })

  const permissions = await ability()

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6">Brand/Manufacturer</TableHead>
              <TableHead style={{ width: 100 }}>Plate</TableHead>
              <TableHead style={{ width: 120 }}>Register</TableHead>
              <TableHead style={{ width: 80 }}>Status</TableHead>
              <TableHead style={{ width: 120 }}>Rented</TableHead>
              <TableHead style={{ width: 200 }}>Created at</TableHead>
              <TableHead className="px-6" style={{ width: 64 }} />
            </TableRow>
          </TableHeader>

          <TableBody>
            {vehicles && vehicles.length ? (
              vehicles.map((vehicle) => {
                return (
                  <TableRow key={vehicle.id}>
                    <TableCell className="px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-primary outline-none">
                          {vehicle.manufacturer}/{vehicle.model}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {vehicle.id}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.plate}</TableCell>
                    <TableCell>{vehicle.register}</TableCell>
                    <TableCell>
                      {vehicle.active ? (
                        <Badge>Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {vehicle.rented ? (
                        <Badge>Rented</Badge>
                      ) : (
                        <Badge variant="secondary">Not rented</Badge>
                      )}
                    </TableCell>
                    <TableCell
                      title={`Criado por ${vehicle.author.name}`}
                      className="flex items-center gap-2"
                    >
                      <Avatar>
                        <AvatarFallback>
                          {getNameInitials(vehicle.author.name)}
                        </AvatarFallback>
                        <AvatarImage src={vehicle.author.avatarUrl} />
                      </Avatar>

                      {dayjs(vehicle.createdAt).fromNow()}
                    </TableCell>
                    <TableCell className="px-6">
                      {permissions?.can('update', 'Vehicle') && (
                        <UpdateVehicle initialData={vehicle} />
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={99} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Suspense fallback={null}>
        <VehiclesPagination
          pageSize={pageSize}
          pageIndex={pageIndex}
          pageCount={pageCount}
        />
      </Suspense>
    </>
  )
}
