import { Metadata } from 'next'
import { ProfileForm } from './profile-form'
import { getProfile } from '@/http/get-profile'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Profile',
}

export const revalidate = 900

export default async function ProfilePage() {
  const user = await getProfile()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile settings</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm initialData={user} />
        </CardContent>
      </Card>
    </>
  )
}
