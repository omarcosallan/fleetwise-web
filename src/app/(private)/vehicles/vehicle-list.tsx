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

import { getNameInitials } from '@/utils/get-name-initials'

import { getVehicles } from '@/http/get-vehicles'

interface VehicleListProps {
  sortBy: string | undefined
  search: string | undefined
  order: string | undefined
  pageIndex: number
  pageSize: number
}

export async function VehicleList({
  sortBy,
  search,
  order,
  pageIndex,
  pageSize,
}: VehicleListProps) {
  const vehicles = await getVehicles({
    sortBy,
    search,
    order,
    pageIndex,
    pageSize,
  })

  return (
    <>
      <div className="rounded-md border mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6">Marca/Modelo</TableHead>
              <TableHead style={{ width: 100 }}>Placa</TableHead>
              <TableHead style={{ width: 120 }}>Renavam</TableHead>
              <TableHead style={{ width: 80 }}>Status</TableHead>
              <TableHead style={{ width: 120 }}>Locado</TableHead>
              <TableHead style={{ width: 200 }}>Criado em</TableHead>
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
                    <TableCell>{vehicle.licensePlate}</TableCell>
                    <TableCell>{vehicle.register}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            vehicle.active ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                          aria-label={vehicle.active ? 'Active' : 'Inactive'}
                        />
                        <p className="text-sm">
                          {vehicle.active ? 'Ativo' : 'Inativo'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {vehicle.rented ? (
                        <Badge>Locado</Badge>
                      ) : (
                        <Badge variant="secondary">Não locado</Badge>
                      )}
                    </TableCell>
                    <TableCell title={`Criado por ${vehicle.author.name}`}>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>
                            {getNameInitials(vehicle.author.name)}
                          </AvatarFallback>
                          <AvatarImage src={vehicle.author.avatarUrl} />
                        </Avatar>

                        <span className="text-sm">
                          {new Date(vehicle.createdAt).toLocaleDateString(
                            'pt-BR',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            },
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6"></TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={99} className="h-96 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <p>Nenhum resultado encontrado</p>
                    <p className="text-muted-foreground">
                      {`Sua busca por "${search ?? ''}" não retornou nenhum resultado.`}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
