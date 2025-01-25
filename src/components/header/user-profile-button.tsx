import Link from 'next/link'
import { auth, signOut } from '@/auth/auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getNameInitials } from '@/utils/get-name-initials'

export async function UserProfileButton() {
  const session = await auth()

  async function handleSignOut() {
    'use server'

    await signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar className="h-8 w-8 ">
          <AvatarImage src={session?.user.image as string} />
          <AvatarFallback>
            {getNameInitials(session?.user?.name as string)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" forceMount>
        <div className="flex items-center gap-2 p-2">
          <Avatar>
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>
              {getNameInitials(session?.user?.name as string)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 truncate">
            <p className="text-sm">{session?.user.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/settings" className="flex-1">
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <form action={handleSignOut}>
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full cursor-pointer">
              Logout
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
