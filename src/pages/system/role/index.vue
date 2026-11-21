<template>
  <div class="system-page">
    <div class="page-heading">
      <div><h2>角色管理</h2><p>管理系统角色，并为角色分配业务权限。</p></div>
      <el-button type="primary" @click="openCreate"><div class="i-ep:plus mr-1" />新增角色</el-button>
    </div>

    <el-card shadow="never" class="filter-card">
      <el-form inline @submit.prevent="load">
        <el-form-item label="关键词"><el-input v-model="filters.keyword" clearable placeholder="角色名称 / 编码" @keyup.enter="load" /></el-form-item>
        <el-form-item label="状态"><el-select v-model="filters.status" clearable placeholder="全部状态" style="width: 140px"><el-option label="启用" value="enabled" /><el-option label="禁用" value="disabled" /></el-select></el-form-item>
        <el-form-item><el-button type="primary" @click="load">查询</el-button><el-button @click="reset">重置</el-button></el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <el-table v-loading="loading" :data="rows" row-key="id">
        <el-table-column prop="name" label="角色名称" min-width="150" />
        <el-table-column prop="code" label="角色编码" min-width="160"><template #default="{ row }"><el-tag effect="plain">{{ row.code }}</el-tag></template></el-table-column>
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column label="权限数量" width="110" align="center"><template #default="{ row }">{{ row.permissionCodes.includes('*') ? '全部' : row.permissionCodes.length }}</template></el-table-column>
        <el-table-column label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status === 'enabled' ? 'success' : 'info'">{{ row.status === 'enabled' ? '启用' : '禁用' }}</el-tag></template></el-table-column>
        <el-table-column prop="createdAt" label="创建时间" min-width="170" />
        <el-table-column label="操作" width="150" fixed="right"><template #default="{ row }"><el-button link type="primary" @click="openEdit(row)">编辑</el-button><el-button link type="danger" :disabled="row.id === 1" @click="remove(row)">删除</el-button></template></el-table-column>
      </el-table>
      <div class="pagination"><el-pagination v-model:current-page="filters.page" v-model:page-size="filters.pageSize" :total="total" layout="total, sizes, prev, pager, next" @change="load" /></div>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="editing ? '编辑角色' : '新增角色'" width="620px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="name"><el-input v-model="form.name" maxlength="30" /></el-form-item>
        <el-form-item label="角色编码" prop="code"><el-input v-model="form.code" :disabled="editing" placeholder="例如 operator" /></el-form-item>
        <el-form-item label="角色描述"><el-input v-model="form.description" type="textarea" :rows="2" /></el-form-item>
        <el-form-item label="角色状态"><el-switch v-model="enabled" active-text="启用" inactive-text="禁用" /></el-form-item>
        <el-form-item label="分配权限">
          <div class="permission-box">
            <div v-for="group in permissionGroups" :key="group.module" class="permission-group">
              <div class="group-title">{{ group.moduleLabel }}</div>
              <el-checkbox-group v-model="form.permissionCodes">
                <el-checkbox v-for="item in group.items" :key="item.code" :value="item.code">{{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" :loading="saving" @click="submit">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { createRole, getPermissions, getRoles, updateRole } from '@/api/system'
import type { SystemPermission, SystemRole } from '@/types/api/system'
import type { FormInstance, FormRules } from 'element-plus'

definePage({ name: 'system-role', meta: { requiresAuth: true, title: '角色管理', permission: 'role:list', keepAlive: true } })
const rows = ref<SystemRole[]>([])
const permissions = ref<SystemPermission[]>([])
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const editing = ref(false)
const formRef = ref<FormInstance>()
const total = ref(0)
const filters = reactive({ page: 1, pageSize: 10, keyword: '', status: '' })
const emptyForm = () => ({ id: 0, name: '', code: '', description: '', status: 'enabled' as 'enabled' | 'disabled', permissionCodes: [] as string[] })
const form = reactive(emptyForm())
const enabled = computed({ get: () => form.status === 'enabled', set: value => (form.status = value ? 'enabled' : 'disabled') })
const rules: FormRules = { name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }], code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }, { pattern: /^[a-z][a-z0-9_]*$/, message: '编码使用小写字母、数字和下划线', trigger: 'blur' }] }
const moduleNames: Record<string, string> = { dashboard: '控制台', user: '用户管理', goods: '商品管理', order: '订单管理', role: '角色管理', menu: '菜单管理', permission: '权限管理' }
const permissionGroups = computed(() => {
  const groups = new Map<string, SystemPermission[]>()
  permissions.value.forEach(item => groups.set(item.module, [...(groups.get(item.module) || []), item]))
  return [...groups].map(([module, items]) => ({ module, moduleLabel: moduleNames[module] || module, items }))
})
async function load() {
  loading.value = true
  try {
    const [roleRes, permissionRes] = await Promise.all([getRoles(filters), getPermissions({ page: 1, pageSize: 100 })])
    if (roleRes.code === 200) { rows.value = roleRes.data.list; total.value = roleRes.data.total }
    if (permissionRes.code === 200) permissions.value = permissionRes.data.list
  } finally { loading.value = false }
}
function reset() { filters.keyword = ''; filters.status = ''; filters.page = 1; void load() }
function openCreate() { editing.value = false; Object.assign(form, emptyForm()); dialogVisible.value = true }
function openEdit(row: SystemRole) { editing.value = true; Object.assign(form, { ...row, permissionCodes: [...row.permissionCodes] }); dialogVisible.value = true }
async function submit() {
  await formRef.value?.validate()
  saving.value = true
  try {
    const payload = { name: form.name, code: form.code, description: form.description, status: form.status, permissionCodes: form.permissionCodes }
    const res = editing.value ? await updateRole(form.id, payload) : await createRole(payload)
    if (res.code === 200) { ElMessage.success(res.message); dialogVisible.value = false; await load() }
    else ElMessage.error(res.message)
  } finally { saving.value = false }
}
async function remove(row: SystemRole) {
  await ElMessageBox.confirm(`确定删除角色「${row.name}」吗？`, '删除确认', { type: 'warning' })
  const { deleteRole } = await import('@/api/system')
  const res = await deleteRole(row.id)
  if (res.code === 200) { ElMessage.success(res.message); await load() } else ElMessage.error(res.message)
}
onMounted(load)
</script>

<style scoped>
.system-page { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.page-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
h2 { margin: 0 0 6px; color: var(--o1-text-primary); font-size: 20px; }
p { margin: 0; color: var(--o1-text-secondary); font-size: 13px; }
.filter-card :deep(.el-card__body) { padding-bottom: 0; }
.pagination { display: flex; justify-content: flex-end; margin-top: 18px; }
.permission-box { width: 100%; max-height: 260px; overflow: auto; padding: 12px; border: 1px solid var(--o1-border-color); border-radius: 8px; }
.permission-group + .permission-group { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--o1-border-color); }
.group-title { margin-bottom: 6px; color: var(--o1-text-primary); font-weight: 600; }
.permission-group :deep(.el-checkbox-group) { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px; }
@media (max-width: 640px) { .page-heading { align-items: flex-start; } .permission-group :deep(.el-checkbox-group) { grid-template-columns: 1fr; } }
</style>
