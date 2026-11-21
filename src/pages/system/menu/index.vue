<template>
  <div class="system-page">
    <div class="page-heading"><div><h2>菜单管理</h2><p>维护后台导航目录、页面入口及其关联权限。菜单配置不负责创建 Vue 页面。</p></div><el-button type="primary" @click="openCreate()"><div class="i-ep:plus mr-1" />新增菜单</el-button></div>
    <el-card shadow="never">
      <el-table v-loading="loading" :data="menus" row-key="id" default-expand-all>
        <el-table-column prop="name" label="菜单名称" min-width="170" />
        <el-table-column label="类型" width="110"><template #default="{ row }"><el-tag :type="typeTag(row.type)">{{ typeLabel(row.type) }}</el-tag></template></el-table-column>
        <el-table-column prop="path" label="路由路径" min-width="180" />
        <el-table-column prop="permission" label="权限标识" min-width="160"><template #default="{ row }">{{ row.permission || '-' }}</template></el-table-column>
        <el-table-column label="显示" width="85"><template #default="{ row }"><el-tag :type="row.visible ? 'success' : 'info'">{{ row.visible ? '显示' : '隐藏' }}</el-tag></template></el-table-column>
        <el-table-column label="状态" width="85"><template #default="{ row }"><el-tag :type="row.status === 'enabled' ? 'success' : 'info'">{{ row.status === 'enabled' ? '启用' : '禁用' }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="160" fixed="right"><template #default="{ row }"><el-button link type="primary" @click="openCreate(row)">添加子级</el-button><el-button link type="primary" @click="openEdit(row)">编辑</el-button><el-button link type="danger" @click="remove(row)">删除</el-button></template></el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" :title="editing ? '编辑菜单' : '新增菜单'" width="560px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="上级菜单"><el-tree-select v-model="form.parentId" :data="parentOptions" :render-after-expand="false" check-strictly default-expand-all placeholder="顶级菜单" /></el-form-item>
        <el-form-item label="菜单名称" prop="name"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="菜单类型"><el-radio-group v-model="form.type"><el-radio value="directory">目录</el-radio><el-radio value="page">页面</el-radio><el-radio value="button">按钮</el-radio></el-radio-group></el-form-item>
        <el-form-item v-if="form.type !== 'button'" label="路由路径"><el-input v-model="form.path" placeholder="/system/example" /></el-form-item>
        <el-form-item label="图标"><el-input v-model="form.icon" placeholder="i-ep:setting" /></el-form-item>
        <el-form-item label="权限标识"><el-input v-model="form.permission" placeholder="system:example" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort" :min="1" :max="999" /></el-form-item>
        <el-form-item label="显示状态"><el-switch v-model="form.visible" active-text="显示" inactive-text="隐藏" /></el-form-item>
        <el-form-item label="启用状态"><el-switch v-model="enabled" active-text="启用" inactive-text="禁用" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" :loading="saving" @click="submit">保存</el-button></template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { createMenu, deleteMenu, getMenus, updateMenu } from '@/api/system'
import type { SystemMenu } from '@/types/api/system'
import type { FormInstance, FormRules } from 'element-plus'
definePage({ name: 'system-menu', meta: { requiresAuth: true, title: '菜单管理', permission: 'menu:list', keepAlive: true } })
const menus = ref<SystemMenu[]>([])
const loading = ref(false), saving = ref(false), dialogVisible = ref(false), editing = ref(false)
const formRef = ref<FormInstance>()
const emptyForm = () => ({ id: 0, parentId: 0, name: '', path: '', icon: '', type: 'page' as SystemMenu['type'], permission: '', sort: 1, visible: true, status: 'enabled' as 'enabled' | 'disabled' })
const form = reactive(emptyForm())
const enabled = computed({ get: () => form.status === 'enabled', set: value => (form.status = value ? 'enabled' : 'disabled') })
const rules: FormRules = { name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }] }
const toOptions = (items: SystemMenu[]): any[] => items.map(item => ({ value: item.id, label: item.name, children: toOptions(item.children || []) }))
const parentOptions = computed(() => [{ value: 0, label: '顶级菜单' }, ...toOptions(menus.value)])
const typeLabel = (type: SystemMenu['type']) => ({ directory: '目录', page: '页面', button: '按钮' })[type]
const typeTag = (type: SystemMenu['type']) => ({ directory: 'warning', page: 'success', button: 'info' })[type] as 'warning' | 'success' | 'info'
async function load() { loading.value = true; try { const res = await getMenus(); if (res.code === 200) menus.value = res.data } finally { loading.value = false } }
function openCreate(parent?: SystemMenu) { editing.value = false; Object.assign(form, emptyForm(), { parentId: parent?.id || 0 }); dialogVisible.value = true }
function openEdit(row: SystemMenu) { editing.value = true; Object.assign(form, { ...row }); dialogVisible.value = true }
async function submit() {
  await formRef.value?.validate()
  if (form.type === 'page' && !form.path) return ElMessage.warning('页面类型必须填写路由路径')
  saving.value = true
  try {
    const payload = { ...form }
    const res = editing.value ? await updateMenu(form.id, payload) : await createMenu(payload)
    if (res.code === 200) { ElMessage.success(res.message); dialogVisible.value = false; await load() } else ElMessage.error(res.message)
  } finally { saving.value = false }
}
async function remove(row: SystemMenu) {
  await ElMessageBox.confirm(`确定删除菜单「${row.name}」吗？`, '删除确认', { type: 'warning' })
  const res = await deleteMenu(row.id)
  if (res.code === 200) { ElMessage.success(res.message); await load() } else ElMessage.error(res.message)
}
onMounted(load)
</script>
<style scoped>
.system-page { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.page-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
h2 { margin: 0 0 6px; color: var(--o1-text-primary); font-size: 20px; }
p { margin: 0; color: var(--o1-text-secondary); font-size: 13px; }
</style>
