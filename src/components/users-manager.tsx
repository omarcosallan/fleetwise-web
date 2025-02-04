import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

import { getNameInitials } from '@/utils/get-name-initials'
import { getUsers } from '@/http/get-users'
import { UserItemActions } from './user-item-actions'
import { ability } from '@/auth/casl'

export async function UsersManager() {
  const users = await getUsers()

  const permissions = await ability()
  const { can } = permissions!

  return (
    <>
      <div className="container">
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="flex items-center justify-between py-4 border-collapse"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatarUrl!} />
                  <AvatarFallback>{getNameInitials(user.name)}</AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="space-x-2">
                  {user.roles.map((role) => {
                    return (
                      <Badge variant="secondary" key={role}>
                        {role
                          .substring(5)
                          .toLocaleLowerCase()
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </Badge>
                    )
                  })}
                </div>

                <UserItemActions
                  id={user.id}
                  canUpdateUser={can('update', {
                    __typename: 'User',
                    id: user.id,
                    roles: user.roles,
                  })}
                  canRemoveUser={can('delete', {
                    __typename: 'User',
                    id: user.id,
                    roles: user.roles,
                  })}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
