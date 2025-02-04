import { ability } from '@/auth/casl'

import { redirect } from 'next/navigation'

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const permissions = await ability()

  const canGetUsers = permissions?.can('get', 'User')

  if (!canGetUsers) {
    redirect('/settings/profile')
  }

  return <>{children}</>
}
