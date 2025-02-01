import { api } from './api-client'

interface UpdateDepartmentStatusProps {
  active: boolean
  slug: string
}

export async function updateDepartmentStatus({
  active,
  slug,
}: UpdateDepartmentStatusProps) {
  const result = await api.patch(`departments/${slug}/status`, {
    json: { active },
  })

  return result
}
