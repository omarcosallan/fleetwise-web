import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { getCurrentOrg } from '@/auth/auth'

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
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'

dayjs.extend(relativeTime)

export async function VehicleList() {
  const currentOrg = await getCurrentOrg()

  const { vehicles } = await getVehicles(currentOrg!)

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand/Manufacturer</TableHead>
              <TableHead style={{ width: 100 }}>Plate</TableHead>
              <TableHead style={{ width: 120 }}>Register</TableHead>
              <TableHead style={{ width: 80 }}>Status</TableHead>
              <TableHead style={{ width: 120 }}>Rented</TableHead>
              <TableHead style={{ width: 200 }}>Created at</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {vehicles && vehicles.length ? (
              vehicles.map((vehicle) => {
                return (
                  <TableRow
                    key={vehicle.id}
                    className="p-6 has-[a:focus-visible]:bg-muted"
                  >
                    <TableCell className="text-muted-foreground">
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
                      title={`Criado por ${vehicle.manufacturer}`}
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
                      <Button
                        size="icon"
                        variant="outline"
                        className="ml-auto hidden lg:flex"
                      >
                        <Copy className="size-4" />
                      </Button>
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
