import { api } from './api-client'

interface DepartmentsAmountSummary {
  amountOverall: number
  amountLastMonth: number
}

export async function getDepartmentsAmountSummary() {
  const result = await api
    .get('summary/departments', {
      next: { tags: ['summary-departments'] },
    })
    .json<DepartmentsAmountSummary>()

  return result
}
