import { ability, getCurrentOrg } from '@/auth/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getInvites } from '@/http/get-invites'

import { RevokeInviteButton } from './revoke-invite-button'
import { CreateInviteForm } from './create-invite-form'

export async function Invites() {
  const currentOrg = await getCurrentOrg()

  const permissions = await ability()

  const invites = await getInvites(currentOrg!)

  return (
    <div className="space-y-4">
      {permissions?.can('create', 'Invite') && (
        <Card>
          <CardHeader>
            <CardTitle>Invite member</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <Card className="space-y-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Invites</CardTitle>
        </CardHeader>

        <CardContent>
          {invites.map((invite) => {
            return (
              <div
                key={invite.id}
                className="first:pt-0 border-b last:border-none last:pb-0 py-3 flex items-center justify-between"
              >
                <div className="flex flex-col font-medium text-sm">
                  <span className="">{invite.email} </span>
                  <span className="text-muted-foreground">{invite.role}</span>
                </div>

                <div className="flex justify-end">
                  {permissions?.can('delete', 'Invite') && (
                    <RevokeInviteButton inviteId={invite.id} />
                  )}
                </div>
              </div>
            )
          })}

          {invites.length === 0 && (
            <div>
              <span className="text-center text-muted-foreground">
                No invites found
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
