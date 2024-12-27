import { ability, getCurrentOrg } from '@/auth/auth'

import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function Tabs() {
  const currentOrg = await getCurrentOrg()

  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')

  const canGetMembers = permissions?.can('get', 'User')
  const canGetVehicles = permissions?.can('get', 'Vehicle')

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        {canGetVehicles && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          >
            <NavLink href={`/org/${currentOrg}`}>Vehicles</NavLink>
          </Button>
        )}

        {canGetMembers && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          >
            <NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
          </Button>
        )}

        {(canUpdateOrganization || canGetBilling) && (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          >
            <NavLink href={`/org/${currentOrg}/settings`}>
              Settings & Billing
            </NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}
