import { Metadata } from 'next'

import { ProfileForm } from '@/components/profile-form'
import { auth } from '@/auth/auth'

import { ChevronRight } from 'lucide-react'

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
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0 max-w-2xl">
          <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
            <div className="truncate">Configurações</div>
            <ChevronRight className="h-3.5 w-3.5" />
            <div className="text-foreground">Perfil</div>
          </div>
          <div className="space-y-2">
            <ProfileForm user={session?.user} />
          </div>
        </div>
      </main>
    </>
  )
}
