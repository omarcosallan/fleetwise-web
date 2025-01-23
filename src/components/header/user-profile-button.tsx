import { auth, signOut } from '@/auth/auth'

import * as Avatar from '@/components/ui/avatar'
import * as Button from '@/components/ui/button'
import * as Dropdown from '@/components/ui/dropdown'
import Link from 'next/link'

export async function UserProfileButton() {
  const session = await auth()

  async function handleSignOut() {
    'use server'

    await signOut()
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Button.Root className="relative h-8 w-8 rounded-full">
          <Avatar.Root size="40">
            {session?.user.image && (
              <Avatar.Image src={session?.user.image as string} />
            )}
          </Avatar.Root>
        </Button.Root>
      </Dropdown.Trigger>
      <Dropdown.Content className="w-56" align="end" forceMount>
        <div className="flex items-center gap-3 p-2">
          <Avatar.Root size="40">
            {session?.user.image && (
              <Avatar.Image src={session?.user.image as string} />
            )}
          </Avatar.Root>

          <div className="flex-1 truncate">
            <div className="text-label-sm text-text-strong-950">
              {session?.user.name}
            </div>

            <div className="mt-1 text-paragraph-xs text-text-sub-600">
              {session?.user?.email}
            </div>
          </div>
        </div>

        <Dropdown.Item>
          <Link href="/settings" className="flex-1">
            Settings
          </Link>
        </Dropdown.Item>

        <Dropdown.Separator />

        <form action={handleSignOut}>
          <Dropdown.Item asChild>
            <button type="submit" className="w-full">
              Logout
            </button>
          </Dropdown.Item>
        </form>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
