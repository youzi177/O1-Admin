import type { MockMethod } from 'vite-plugin-mock'
const trends = {
  day: [
    ['00:00', 3],
    ['04:00', 5],
    ['08:00', 12],
    ['12:00', 18],
    ['16:00', 25],
    ['20:00', 31],
  ],
  week: [
    ['周一', 18],
    ['周二', 26],
    ['周三', 21],
    ['周四', 35],
    ['周五', 42],
    ['周六', 51],
    ['周日', 38],
  ],
  month: [
    ['第1周', 120],
    ['第2周', 156],
    ['第3周', 139],
    ['第4周', 182],
  ],
}
export default [
  {
    url: '/api/admin/dashboard/overview',
    method: 'get',
    response: ({ query }) => {
      const range = query.range in trends ? (query.range as keyof typeof trends) : 'week'
      return {
        code: 200,
        message: '获取成功',
        data: {
          statistics: {
            paidOrders: 1286,
            orderCount: 2358,
            salesAmount: 28653.8,
            newUsers: 356,
            conversionRate: 60,
            totalUsers: 12860,
          },
          orderTrend: trends[range].map(([date, count]) => ({ date, count })),
          shopReminders: [
            { label: '待审核', value: 2, path: '/goods/list' },
            { label: '销售中', value: 139, path: '/goods/list' },
            { label: '已下架', value: 16, path: '/goods/list' },
            { label: '库存预警', value: 21, path: '/goods/list' },
          ],
          tradeReminders: [
            { label: '待付款', value: 171, path: '/order/list' },
            { label: '待发货', value: 16, path: '/order/list' },
            { label: '已发货', value: 128, path: '/order/list' },
            { label: '退款中', value: 7, path: '/order/list' },
          ],
        },
      }
    },
  },
] as MockMethod[]
