import { organizationSchema } from '@/lib/casl'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'

import { ability, auth, getCurrentOrg } from '@/auth/auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

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
    <div className="rounded-lg border">
      <Table>
        <TableBody>
          {members?.map((member) => {
            return (
              <TableRow key={member.id}>
                <TableCell style={{ width: 48 }}>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={member.avatarUrl!} alt="Avatar" />
                    <AvatarFallback>
                      {getNameInitials(member.name!)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex flex-col ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {member.name}
                      {member.userId === membership.userId && ' (me)'}
                      {organization.ownerId === member.userId && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Crown className="size-3" />
                          Owner
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    {permissions?.can('transfer_ownership', authOrganization) &&
                      user.id !== member.userId && (
                        <form
                          action={transferOrganizationAction.bind(
                            null,
                            member.userId,
                          )}
                        >
                          <Button size="sm" variant="ghost" type="submit">
                            <ArrowLeftRight className="mr-2 size-4" />
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
                          <UserMinus className="mr-2 size-4" />
                          Remove
                        </Button>
                      </form>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
