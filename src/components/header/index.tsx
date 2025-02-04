import { UserProfileButton } from './user-profile-button'
import { ModeSwitcher } from './mode-switcher'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

export async function Header() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <nav className="flex items-center gap-0.5">
              <UserProfileButton />
              <ModeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
