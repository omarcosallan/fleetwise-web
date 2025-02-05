'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <span className="hidden font-bold sm:inline-block">ACME Inc</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          href="/"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/' ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/departments"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname.includes('/departments')
              ? 'text-foreground'
              : 'text-foreground/80',
          )}
        >
          Secretarias
        </Link>
        <Link
          href="/vehicles"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname.includes('/vehicles')
              ? 'text-foreground'
              : 'text-foreground/80',
          )}
        >
          Veículos
        </Link>
        <Link
          href="/settings/profile"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname.includes('/settings')
              ? 'text-foreground'
              : 'text-foreground/80',
          )}
        >
          Configurações
        </Link>
      </nav>
    </div>
  )
}
