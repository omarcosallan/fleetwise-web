import Link from 'next/link'

import { UserProfileButton } from './user-profile-button'
import { ThemeSwitcher } from './theme-switcher'

export async function Header() {
  return (
    <header className="mx-auto sticky top-0 z-50 w-full border-b border-b-gray-500">
      <div className="container flex h-14 items-center mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">ACME Inc</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium"></nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <ThemeSwitcher />
          <UserProfileButton />
        </div>
      </div>
    </header>
  )
}
