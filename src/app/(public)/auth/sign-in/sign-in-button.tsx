'use client'

import { Loader2, LogIn } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import * as Button from '@/components/ui/button'

export function SignInButton() {
  const { pending } = useFormStatus()

  return (
    <Button.Root disabled={pending} type="submit" className="w-full">
      {pending ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <LogIn className="mr-2 size-4" />
      )}
      Sign in
    </Button.Root>
  )
}
