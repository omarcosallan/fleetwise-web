'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { SignInButton } from './sign-in-button'

import { signInWithEmail } from './actions'
import { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={signInWithEmail} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>

        <div className="flex">
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="joe@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <div className="flex relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
          />

          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-0 hover:bg-inherit"
          >
            {showPassword ? (
              <Eye className="size-5 text-muted-foreground" />
            ) : (
              <EyeOff className="size-5 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <SignInButton />
    </form>
  )
}
