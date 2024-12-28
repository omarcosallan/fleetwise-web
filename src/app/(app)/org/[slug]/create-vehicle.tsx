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
      <SheetContent className="flex flex-col gap-6 h-full">
        <SheetHeader className="py-4">
          <SheetTitle>Create vehicle</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <VehicleForm />
      </SheetContent>
    </Sheet>
  )
}
