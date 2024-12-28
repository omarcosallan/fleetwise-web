import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function VehicleList() {
  const vehicles = []

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marca/Modelo</TableHead>
              <TableHead className="max-w-min">Placa</TableHead>
              <TableHead>Renavam</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Locado</TableHead>
              <TableHead style={{ width: 200 }}>Secretaria</TableHead>
              <TableHead>Criado há</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {vehicles && vehicles.length ? (
              <TableRow>
                <TableCell className="text-muted-foreground">
                  <div>
                    <span className="font-medium">
                      {vehicle.manufacturer}/{vehicle.model}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-300">{vehicle.plate}</TableCell>
                <TableCell className="text-zinc-300">
                  {vehicle.renavam}
                </TableCell>
                <TableCell>
                  {vehicle.active ? (
                    <Badge>Ativo</Badge>
                  ) : (
                    <Badge variant="secondary">Inativo</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {vehicle.rented ? (
                    <Badge>Locado</Badge>
                  ) : (
                    <Badge variant="secondary">Não locado</Badge>
                  )}
                </TableCell>
                <TableCell
                  className="truncate max-w-16"
                  title={vehicle.department.name}
                >
                  {vehicle.department.name}
                </TableCell>
                <TableCell
                  title={`Criado por ${vehicle.createdBy.name}`}
                  className="flex items-center gap-2"
                >
                  <Avatar>
                    <AvatarFallback>
                      {getNameInitials(vehicle.createdBy.name)}
                    </AvatarFallback>
                  </Avatar>
                  {formatDistanceToNow(vehicle.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  {permissions?.can('update', 'Vehicle') && (
                    <UpdateVehicle
                      vehicle={{
                        id: vehicle.id,
                        model: vehicle.model,
                        manufacturer: vehicle.manufacturer,
                        manufacturingYear: String(vehicle.manufacturingYear),
                        plate: vehicle.plate,
                        registration: vehicle.renavam,
                        rented: vehicle.rented,
                        active: vehicle.active,
                        vehicleType: vehicle.vehicleType,
                        departmentId: vehicle.department.id,
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
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
