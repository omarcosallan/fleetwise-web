import type { MainNavItem, SidebarNavItem } from '@/types/nav'

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    { title: 'Dashboard', href: '/' },
    { title: 'Configurações', href: '/settings' },
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
        },
      ],
    },
  ],
}
