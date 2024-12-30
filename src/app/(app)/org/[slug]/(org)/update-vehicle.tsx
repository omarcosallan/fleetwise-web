import { VehicleForm, VehicleSchema } from './vehicle-form'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

import { Ellipsis } from 'lucide-react'

export function UpdateVehicle({ initialData }: { initialData: VehicleSchema }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Update vehicle</SheetTitle>
          <SheetDescription>
            Update vehicle details here. Click save when finished.
          </SheetDescription>
        </SheetHeader>

        <VehicleForm isUpdating initialData={initialData} />
      </SheetContent>
    </Sheet>
  )
}
