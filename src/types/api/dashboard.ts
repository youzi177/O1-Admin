export type DashboardRange = 'day' | 'week' | 'month'
export interface DashboardReminderItem {
  label: string
  value: number
  path: string
}
export interface DashboardOverview {
  statistics: {
    paidOrders: number
    orderCount: number
    salesAmount: number
    newUsers: number
    conversionRate: number
    totalUsers: number
  }
  orderTrend: { date: string; count: number }[]
  shopReminders: DashboardReminderItem[]
  tradeReminders: DashboardReminderItem[]
}
export interface DashboardResponse {
  code: number
  message: string
  data: DashboardOverview
}
export interface DashboardOrderTrend {
  date: string
  count: number
}
