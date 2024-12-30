import { ability, getCurrentOrg } from '@/auth/auth'

import { NavLink } from './nav-link'

export async function Tabs() {
  const currentOrg = await getCurrentOrg()

  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')

  const canGetMembers = permissions?.can('get', 'User')
  const canGetVehicles = permissions?.can('get', 'Vehicle')

  return (
    <div className="border-grid border-b">
      <div className="container-wrapper mx-auto max-w-[1200px] ">
        <div className="container py-4">
          <nav className="flex items-center gap-2">
            {canGetVehicles && (
              <NavLink href={`/org/${currentOrg}`}>Vehicles</NavLink>
            )}

            {canGetMembers && (
              <NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
            )}

            {(canUpdateOrganization || canGetBilling) && (
              <NavLink href={`/org/${currentOrg}/settings`}>
                Settings & Billing
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
