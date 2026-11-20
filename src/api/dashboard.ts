import { get } from '@/utils/http'
import type { DashboardRange, DashboardResponse } from '@/types/api/dashboard'
export const getDashboardOverview = (range: DashboardRange = 'week') =>
  get<DashboardResponse>(`/api/admin/dashboard/overview?range=${range}`)
