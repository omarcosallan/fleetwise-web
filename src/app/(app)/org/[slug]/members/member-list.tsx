import { organizationSchema } from '@/lib/casl'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'

import { ability, auth, getCurrentOrg } from '@/auth/auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction, transferOrganizationAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'
import { getNameInitials } from '@/utils/get-name-initials'

export async function MemberList() {
  const { user } = await auth()
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()

  const [membership, members, organization] = await Promise.all([
    getMembership(currentOrg!),
    getMembers(currentOrg!),
    getOrganization(currentOrg!),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          {members?.map((member) => (
            <div
              key={member.id}
              className="first:pt-0 border-b last:border-none last:pb-0 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatarUrl!} alt="Avatar" />
                  <AvatarFallback>
                    {getNameInitials(member.name!)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-medium">
                    {member.name}
                    {member.userId === membership.userId && ' (me)'}
                    {organization.ownerId === member.userId && (
                      <span className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Crown className="h-4 w-4" />
                        Owner
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {permissions?.can('transfer_ownership', authOrganization) &&
                  user.id !== member.userId && (
                    <form
                      action={transferOrganizationAction.bind(
                        null,
                        member.userId,
                      )}
                    >
                      <Button size="sm" variant="ghost" type="submit">
                        <ArrowLeftRight className="mr-2 h-4 w-4" />
                        Transfer ownership
                      </Button>
                    </form>
                  )}

                <UpdateMemberRoleSelect
                  memberId={member.id}
                  value={member.role}
                  disabled={
                    member.userId === membership.userId ||
                    member.userId === organization.ownerId ||
                    permissions?.cannot('update', 'User')
                  }
                />

                {permissions?.can('delete', 'User') && (
                  <form action={removeMemberAction.bind(null, member.id)}>
                    <Button
                      disabled={
                        member.userId === membership.userId ||
                        member.userId === organization.ownerId
                      }
                      type="submit"
                      size="sm"
                      variant="destructive"
                    >
                      <UserMinus className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
