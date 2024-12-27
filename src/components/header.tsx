import { Slash } from 'lucide-react'
import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'
import { OrganizationSwitcher } from './organization-switcher'

export function Header() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        Icon aqui
        <Slash className="size-3 -rotate-[24deg] text-border" />
        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <Separator orientation="vertical" className="h-5" />

        <ProfileButton />
      </div>
    </div>
  )
}
