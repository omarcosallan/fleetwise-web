import { RegisterForm } from './register-form'

import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export function CreateUserSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">Criar novo</Button>
      </SheetTrigger>
      <SheetContent className="space-y-4">
        <SheetTitle>Criar usuário</SheetTitle>
        <SheetDescription></SheetDescription>
        <RegisterForm />
      </SheetContent>
    </Sheet>
  )
}
