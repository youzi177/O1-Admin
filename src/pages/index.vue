<template>
  <div v-loading="loading" class="dashboard-page">
    <div v-if="errorMessage" class="error">
      <el-alert :title="errorMessage" type="error" show-icon :closable="false" /><el-button
        size="small"
        @click="loadDashboard(range)"
        >重试</el-button
      >
    </div>
    <div class="statistics">
      <DashboardStat
        title="支付订单"
        :value="overview.statistics.paidOrders"
        tag="年"
        footer-label="总支付订单"
        :footer-value="overview.statistics.paidOrders"
        tag-type="success"
      />
      <DashboardStat
        title="订单量"
        :value="overview.statistics.orderCount"
        tag="周"
        footer-label="转化率"
        :footer-value="`${overview.statistics.conversionRate}%`"
        tag-type="danger"
      />
      <DashboardStat
        title="销售额"
        :value="overview.statistics.salesAmount"
        tag="年"
        footer-label="总销售额"
        :footer-value="overview.statistics.salesAmount.toFixed(2)"
        format="currency"
        tag-type="primary"
      />
      <DashboardStat
        title="新增用户"
        :value="overview.statistics.newUsers"
        tag="年"
        footer-label="总用户"
        :footer-value="overview.statistics.totalUsers"
        tag-type="warning"
      />
    </div>
    <DashboardShortcuts />
    <div class="content">
      <DashboardChart :data="overview.orderTrend" @change="loadDashboard" /><DashboardReminders
        :shop-items="overview.shopReminders"
        :trade-items="overview.tradeReminders"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getDashboardOverview } from '@/api/dashboard'
import type { DashboardOverview, DashboardRange } from '@/types/api/dashboard'

defineOptions({ name: 'HomePage' })
definePage({
  name: 'index',
  meta: { requiresAuth: true, title: '首页', affix: true, keepAlive: true, cacheName: 'HomePage' },
})
const empty: DashboardOverview = {
  statistics: {
    paidOrders: 0,
    orderCount: 0,
    salesAmount: 0,
    newUsers: 0,
    conversionRate: 0,
    totalUsers: 0,
  },
  orderTrend: [],
  shopReminders: [],
  tradeReminders: [],
}
const overview = ref<DashboardOverview>(structuredClone(empty))
const loading = ref(false),
  errorMessage = ref(''),
  range = ref<DashboardRange>('week')
async function loadDashboard(next: DashboardRange) {
  range.value = next
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await getDashboardOverview(next)
    if (res.code !== 200) throw new Error(res.message || '首页数据获取失败')
    overview.value = res.data
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '首页数据获取失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  void loadDashboard(range.value)
})
</script>
<style scoped>
.dashboard-page {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 16px;
}
.statistics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}
.content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: start;
  gap: 14px;
}
.error {
  display: flex;
  align-items: center;
  gap: 10px;
}
@media (max-width: 1100px) {
  .statistics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .content {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (max-width: 480px) {
  .statistics {
    gap: 8px;
  }
  .dashboard-page {
    gap: 12px;
  }
}
</style>
<route lang="yaml">
meta:
  layout: default
</route>
