<template>
  <div class="system-page">
    <div class="page-heading"><div><h2>权限管理</h2><p>查看系统预定义的业务权限标识。权限定义由代码维护，角色通过权限标识获得授权。</p></div><el-tag type="info" effect="plain">代码定义 · Mock 数据</el-tag></div>
    <el-card shadow="never" class="filter-card">
      <el-form inline @submit.prevent="load">
        <el-form-item label="关键词"><el-input v-model="filters.keyword" clearable placeholder="权限名称 / 标识 / 模块" @keyup.enter="load" /></el-form-item>
        <el-form-item label="状态"><el-select v-model="filters.status" clearable placeholder="全部状态" style="width: 140px"><el-option label="启用" value="enabled" /><el-option label="禁用" value="disabled" /></el-select></el-form-item>
        <el-form-item><el-button type="primary" @click="load">查询</el-button><el-button @click="reset">重置</el-button></el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <el-table v-loading="loading" :data="rows" row-key="id">
        <el-table-column prop="name" label="权限名称" min-width="130" />
        <el-table-column prop="code" label="权限标识" min-width="190"><template #default="{ row }"><el-tag effect="plain">{{ row.code }}</el-tag></template></el-table-column>
        <el-table-column prop="module" label="所属模块" width="120" />
        <el-table-column prop="action" label="业务操作" width="110" />
        <el-table-column prop="method" label="HTTP" width="100"><template #default="{ row }"><el-tag :type="methodTag(row.method)">{{ row.method }}</el-tag></template></el-table-column>
        <el-table-column prop="api" label="接口地址" min-width="230" />
        <el-table-column prop="description" label="说明" min-width="160" show-overflow-tooltip />
        <el-table-column label="状态" width="90"><template #default="{ row }"><el-tag :type="row.status === 'enabled' ? 'success' : 'info'">{{ row.status === 'enabled' ? '启用' : '禁用' }}</el-tag></template></el-table-column>
      </el-table>
      <div class="pagination"><el-pagination v-model:current-page="filters.page" v-model:page-size="filters.pageSize" :total="total" layout="total, sizes, prev, pager, next" @change="load" /></div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { getPermissions } from '@/api/system'
import type { SystemPermission } from '@/types/api/system'
definePage({ name: 'system-permission', meta: { requiresAuth: true, title: '权限管理', permission: 'permission:list', keepAlive: true } })
const rows = ref<SystemPermission[]>([])
const loading = ref(false), total = ref(0)
const filters = reactive({ page: 1, pageSize: 10, keyword: '', status: '' })
const methodTag = (method: string) => ({ GET: 'success', POST: 'warning', PUT: 'primary', DELETE: 'danger' })[method] as 'success' | 'warning' | 'primary' | 'danger'
async function load() { loading.value = true; try { const res = await getPermissions(filters); if (res.code === 200) { rows.value = res.data.list; total.value = res.data.total } } finally { loading.value = false } }
function reset() { filters.keyword = ''; filters.status = ''; filters.page = 1; void load() }
onMounted(load)
</script>
<style scoped>
.system-page { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.page-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
h2 { margin: 0 0 6px; color: var(--o1-text-primary); font-size: 20px; }
p { margin: 0; color: var(--o1-text-secondary); font-size: 13px; }
.filter-card :deep(.el-card__body) { padding-bottom: 0; }
.pagination { display: flex; justify-content: flex-end; margin-top: 18px; }
</style>
