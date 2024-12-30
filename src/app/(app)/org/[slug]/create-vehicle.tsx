import { VehicleForm } from '../vehicle-form'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

import { Plus } from 'lucide-react'

export function CreateVehicle() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" size="sm">
          <Plus className="size-4" />
          Create new
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Create vehicle</SheetTitle>
          <SheetDescription>
            Add vehicles to your organization here. Click save when finished.
          </SheetDescription>
        </SheetHeader>

        <VehicleForm />
      </SheetContent>
    </Sheet>
  )
}
