<template>
  <div class="order-page">
    <div class="page-heading">
      <div><h2>订单管理</h2><p>财务账号示例页面：仅展示订单查看与导出权限。</p></div>
      <el-button v-permission="'order:export'" type="primary" @click="exportOrders"><div class="i-ep:download mr-1" />导出订单</el-button>
    </div>
    <el-card shadow="never">
      <el-table :data="orders" stripe>
        <el-table-column prop="id" label="订单编号" min-width="150" />
        <el-table-column prop="customer" label="客户" min-width="120" />
        <el-table-column prop="amount" label="订单金额" min-width="120" />
        <el-table-column prop="status" label="状态" min-width="100" />
        <el-table-column prop="createdAt" label="下单时间" min-width="170" />
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
definePage({ name: 'order-list', meta: { requiresAuth: true, title: '订单管理', permission: 'order:list', keepAlive: true } })
const orders = [
  { id: 'O20261121001', customer: '示例客户 A', amount: '¥ 1,280.00', status: '已支付', createdAt: '2026-11-21 09:30' },
  { id: 'O20261121002', customer: '示例客户 B', amount: '¥ 860.00', status: '待结算', createdAt: '2026-11-21 10:15' },
]
function exportOrders() { ElMessage.success('演示：订单导出权限验证通过') }
</script>

<style scoped>
.order-page { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.page-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
h2 { margin: 0 0 6px; color: var(--o1-text-primary); font-size: 20px; }
p { margin: 0; color: var(--o1-text-secondary); font-size: 13px; }
</style>
