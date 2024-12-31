import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRecentActivity } from '@/http/recent-activity'
import { Building, Car, UserPlus2 } from 'lucide-react'

dayjs.extend(relativeTime)

export async function RecentActivity() {
  const recents = await getRecentActivity()

  return (
    <Card className="border-none">
      <CardHeader className="pt-0 pl-0">
        <CardTitle className="font-semibold leading-none tracking-tight">
          Recent activity
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-0 border-b">
        {recents && recents.length > 0 ? (
          recents.map((activity) => (
            <div
              key={activity.createdAt.toString()}
              className="flex justify-between gap-4"
            >
              <div className="flex items-start gap-2">
                {activity.type === 'vehicle' && (
                  <Car className="h-6 w-6 text-muted-foreground" />
                )}
                {activity.type === 'invite' && (
                  <UserPlus2 className="h-6 w-6 text-muted-foreground" />
                )}
                {activity.type === 'organization' && (
                  <Building className="h-6 w-6 text-muted-foreground" />
                )}

                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {activity.ownerName}
                  </span>{' '}
                  created a {activity.type} in {activity.organizationName}
                </p>
              </div>

              <span className="text-xs text-muted-foreground min-w-max self-end md:self-auto">
                {dayjs(activity.createdAt).fromNow()}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No recent activities to display.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
