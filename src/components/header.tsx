import { Slash } from 'lucide-react'

import { Separator } from './ui/separator'
import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme/theme-switcher'
import { OrganizationSwitcher } from './organization-switcher'
import { PendingInvites } from './pending-invites'
import Link from 'next/link'

export function Header() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">Icon aqui</Link>
        <Slash className="size-3 -rotate-[24deg] text-border" />
        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <PendingInvites />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
