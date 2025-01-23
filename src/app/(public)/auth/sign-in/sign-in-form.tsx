'use client'

import * as Button from '@/components/ui/button'
import * as Input from '@/components/ui/input'
import * as Label from '@/components/ui/label'

import { SignInButton } from './sign-in-button'

import { signInWithEmail } from './actions'
import { useState } from 'react'
import {
  RiEyeLine,
  RiEyeOffLine,
  RiLock2Line,
  RiUser6Line,
} from '@remixicon/react'

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={signInWithEmail} className="space-y-4">
      <div className="space-y-2">
        <Label.Root htmlFor="email">E-mail</Label.Root>
        <Input.Root>
          <Input.Wrapper>
            <Input.Icon as={RiUser6Line} />
            <Input.Input
              name="email"
              id="email"
              type="email"
              placeholder="joe@example.com"
            />
          </Input.Wrapper>
        </Input.Root>
      </div>

      <div className="space-y-2">
        <Label.Root htmlFor="password">Password</Label.Root>

        <Input.Root>
          <Input.Wrapper>
            <Input.Icon as={RiLock2Line} />
            <Input.Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••"
            />
            <Button.Root
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              mode="ghost"
            >
              {showPassword ? (
                <RiEyeOffLine className="size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300" />
              ) : (
                <RiEyeLine className="size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300" />
              )}
            </Button.Root>
          </Input.Wrapper>
        </Input.Root>
      </div>

      <SignInButton />
    </form>
  )
}
