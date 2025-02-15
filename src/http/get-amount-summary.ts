import { api } from './api-client'

interface Summary {
  entity: string
  amountOverall: number
  amountLastMonth: number
}

export async function getAmountSummary() {
  const result = await api
    .get('summary', {
      next: { tags: ['summary'] },
    })
    .json<Summary[]>()

  return result
}
