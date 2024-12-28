import { api } from './api-client'

interface TransferOrganizationRequest {
  org: string
  memberId: string
}

export async function transferOrganization({
  org,
  memberId,
}: TransferOrganizationRequest) {
  await api.patch(`organizations/${org}/owner`, {
    json: { transferToUserId: memberId },
  })
}
