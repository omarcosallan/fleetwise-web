import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { getOrganizations } from '@/http/get-organizations'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

dayjs.extend(relativeTime)

export async function OrganizationList() {
  const { organizations } = await getOrganizations()

  return (
    <>
      {organizations?.map((organization) => {
        return (
          <Card key={organization.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{organization.name}</CardTitle>
              <CardDescription className="line-clamp-2 leading-relaxed">
                {organization.slug}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center gap-1.5">
              <Avatar className="size-4">
                {organization.avatarUrl && (
                  <AvatarImage src={organization.avatarUrl} />
                )}
                <AvatarFallback />
              </Avatar>

              <span className="truncate text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {organization.owner.name}
                </span>{' '}
                {dayjs(organization.createdAt).fromNow()}
              </span>

              <Button size="xs" variant="outline" className="ml-auto">
                View <ArrowRight className="ml-2 size-3" />
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </>
  )
}