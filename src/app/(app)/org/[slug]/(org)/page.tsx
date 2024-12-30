import { Metadata } from 'next'

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

dayjs.extend(relativeTime)

export const metadata: Metadata = {
  title: 'Vehicles',
}

export default async function OrgPage() {
  const currentOrg = await getCurrentOrg()

  const vehicles = await getVehicles(currentOrg!)

  const permissions = await ability()

  return (
    <>
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
            {vehicles && vehicles.length ? (
              vehicles.map((vehicle) => {
                return (
                  <TableRow key={vehicle.id}>
                    <TableCell>
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
                    <TableCell>
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
    </>
  )
}
