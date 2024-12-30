import { Metadata } from 'next'

import { ability } from '@/auth/auth'

import { Invites } from './invites'
import { MemberList } from './member-list'

export const metadata: Metadata = {
  title: 'Members',
}

export default async function MembersPage() {
  const permissions = await ability()

  return (
    <>
      <div className="space-y-4">
        {permissions?.can('get', 'User') && <MemberList />}
        {permissions?.can('get', 'Invite') && <Invites />}
      </div>
    </>
  )
}
