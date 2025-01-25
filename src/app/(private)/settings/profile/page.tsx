import { Metadata } from 'next'

import { PageHeader, PageHeaderHeading } from '@/components/page.header'
import { UserForm } from './user-form'
import { auth } from '@/auth/auth'

export const metadata: Metadata = {
  title: 'Profile Settings',
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    return
  }

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Perfil</PageHeaderHeading>
      </PageHeader>
      <div className="container-wrapper">
        <div className="container py-6">
          <div className="max-w-2xl w-full mx-auto">
            <UserForm user={session?.user} />
          </div>
        </div>
      </div>
    </>
  )
}
