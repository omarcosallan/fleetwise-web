import type { AppAbility } from '@/lib/casl'

import type { MainNavItem, SidebarNavItem } from '@/types/nav'

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export function getDocsConfig(ability?: AppAbility | null): DocsConfig {
  return {
    mainNav: [
      { title: 'Dashboard', href: '/' },
      { title: 'Secretarias', href: '/departments' },
      { title: 'Configurações', href: '/settings/profile' },
    ],
    sidebarNav: [
      {
        title: 'Geral',
        items: [
          {
            title: 'Perfil',
            href: '/settings/profile',
            items: [],
          },
          {
            title: 'Usuários',
            href: '/settings/users',
            items: [],
            disabled: !ability?.can('get', 'User'),
          },
        ],
      },
    ],
  }
}
