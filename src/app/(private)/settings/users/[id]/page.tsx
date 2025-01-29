import { ability } from '@/auth/casl'
import { ProfileForm } from '@/components/profile-form'
import { getUser } from '@/http/get-user'
import { ChevronRight } from 'lucide-react'

import type { Metadata } from 'next'
import Link from 'next/link'

interface UserPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const { id } = await params

  return {
    title: `User ${id}`,
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params
  const user = await getUser({ id })

  const permissions = await ability()
  const cannotUpdateUser = permissions?.cannot('update', 'User')

  return (
    <>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0 max-w-2xl">
          <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
            <div className="truncate">Configurações</div>
            <ChevronRight className="h-3.5 w-3.5" />
            <div className="hover:underline hover:text-foreground">
              <Link href="./" prefetch={false}>
                Usuários
              </Link>
            </div>
            <ChevronRight className="h-3.5 w-3.5" />
            <div className="text-foreground">{user.name}</div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
              {user.name}
            </h1>
          </div>
          <div className="pb-12 pt-8">
            <ProfileForm
              user={{ ...user, image: user.avatarUrl }}
              cannotUpdateUser={cannotUpdateUser}
            />
          </div>
        </div>
      </main>
    </>
  )
}
