import type { MockMethod } from 'vite-plugin-mock'

type Status = 'enabled' | 'disabled'

let roles = [
  { id: 1, name: '超级管理员', code: 'super_admin', description: '拥有系统全部管理权限', status: 'enabled' as Status, permissionCodes: ['*'], createdAt: '2026-11-01 10:00:00' },
  { id: 2, name: '运营人员', code: 'operator', description: '负责日常业务运营', status: 'enabled' as Status, permissionCodes: ['dashboard:view', 'user:list', 'user:detail', 'goods:list'], createdAt: '2026-11-02 11:30:00' },
  { id: 3, name: '财务人员', code: 'finance', description: '负责财务数据查看', status: 'enabled' as Status, permissionCodes: ['dashboard:view', 'dashboard:statistics:paid-orders', 'dashboard:statistics:order-count', 'order:list', 'order:detail', 'order:export'], createdAt: '2026-11-03 09:20:00' },
  { id: 4, name: '访客', code: 'visitor', description: '只读访问', status: 'disabled' as Status, permissionCodes: ['dashboard:view'], createdAt: '2026-11-04 14:10:00' },
]

let menus = [
  { id: 1, parentId: 0, name: '后台面板', path: '/home', icon: 'i-ep:odometer', type: 'directory' as const, permission: '', sort: 1, visible: true, status: 'enabled' as Status },
  { id: 2, parentId: 1, name: '主控台', path: '/', icon: 'i-ep:home-filled', type: 'page' as const, permission: 'dashboard:view', sort: 1, visible: true, status: 'enabled' as Status },
  { id: 3, parentId: 0, name: '商城管理', path: '/goods', icon: 'i-ep:shop', type: 'directory' as const, permission: '', sort: 2, visible: true, status: 'enabled' as Status },
  { id: 4, parentId: 3, name: '商品管理', path: '/goods/list', icon: 'i-ep:goods', type: 'page' as const, permission: 'goods:list', sort: 1, visible: true, status: 'enabled' as Status },
  { id: 5, parentId: 3, name: '订单管理', path: '/order/list', icon: 'i-ep:document', type: 'page' as const, permission: 'order:list', sort: 2, visible: true, status: 'enabled' as Status },
  { id: 6, parentId: 3, name: '用户管理', path: '/user/list', icon: 'i-ep:user', type: 'page' as const, permission: 'user:list', sort: 3, visible: true, status: 'enabled' as Status },
  { id: 7, parentId: 0, name: '系统管理', path: '/system', icon: 'i-ep:setting', type: 'directory' as const, permission: '', sort: 3, visible: true, status: 'enabled' as Status },
  { id: 8, parentId: 7, name: '系统设置', path: '/system/settings', icon: 'i-ep:setting', type: 'page' as const, permission: 'system:settings', sort: 1, visible: true, status: 'enabled' as Status },
  { id: 9, parentId: 7, name: '角色管理', path: '/system/role', icon: 'i-ep:user', type: 'page' as const, permission: 'role:list', sort: 2, visible: true, status: 'enabled' as Status },
  { id: 10, parentId: 7, name: '菜单管理', path: '/system/menu', icon: 'i-ep:menu', type: 'page' as const, permission: 'menu:list', sort: 3, visible: true, status: 'enabled' as Status },
  { id: 11, parentId: 7, name: '权限管理', path: '/system/permission', icon: 'i-ep:lock', type: 'page' as const, permission: 'permission:list', sort: 4, visible: true, status: 'enabled' as Status },
]

let permissions = [
  ['仪表盘', 'dashboard:view', 'dashboard', 'view', 'GET', '/api/admin/dashboard/overview', '查看控制台页面'],
  ['查看支付订单统计', 'dashboard:statistics:paid-orders', 'dashboard', 'paid_orders', 'GET', '/api/admin/dashboard/overview', '查看支付订单统计卡片'],
  ['查看订单量统计', 'dashboard:statistics:order-count', 'dashboard', 'order_count', 'GET', '/api/admin/dashboard/overview', '查看订单量统计卡片'],
  ['查看销售额统计', 'dashboard:statistics:sales-amount', 'dashboard', 'sales_amount', 'GET', '/api/admin/dashboard/overview', '查看销售额统计卡片'],
  ['查看新增用户统计', 'dashboard:statistics:new-users', 'dashboard', 'new_users', 'GET', '/api/admin/dashboard/overview', '查看新增用户统计卡片'],
  ['查看商品', 'goods:list', 'goods', 'list', 'GET', '/api/admin/goods', '查看商品列表'],
  ['查看订单', 'order:list', 'order', 'list', 'GET', '/api/admin/orders', '查看订单列表'],
  ['查看订单详情', 'order:detail', 'order', 'detail', 'GET', '/api/admin/orders/:id', '查看订单详情'],
  ['导出订单', 'order:export', 'order', 'export', 'POST', '/api/admin/orders/export', '导出订单数据'],
  ['查看用户', 'user:list', 'user', 'list', 'GET', '/api/admin/users', '查看用户列表'],
  ['查看用户详情', 'user:detail', 'user', 'detail', 'GET', '/api/admin/users/:id', '查看用户详情'],
  ['查看角色', 'role:list', 'role', 'list', 'GET', '/api/admin/roles', '查看角色列表'],
  ['新增角色', 'role:add', 'role', 'add', 'POST', '/api/admin/roles', '创建角色'],
  ['编辑角色', 'role:edit', 'role', 'edit', 'PUT', '/api/admin/roles/:id', '修改角色信息及权限'],
  ['删除角色', 'role:delete', 'role', 'delete', 'DELETE', '/api/admin/roles/:id', '删除角色'],
  ['查看菜单', 'menu:list', 'menu', 'list', 'GET', '/api/admin/menus', '查看菜单树'],
  ['新增菜单', 'menu:add', 'menu', 'add', 'POST', '/api/admin/menus', '创建菜单'],
  ['编辑菜单', 'menu:edit', 'menu', 'edit', 'PUT', '/api/admin/menus/:id', '修改菜单'],
  ['删除菜单', 'menu:delete', 'menu', 'delete', 'DELETE', '/api/admin/menus/:id', '删除菜单'],
  ['查看权限', 'permission:list', 'permission', 'list', 'GET', '/api/admin/permissions', '查看权限目录'],
].map((item, index) => ({ id: index + 1, name: item[0], code: item[1], module: item[2], action: item[3], method: item[4], api: item[5], description: item[6], status: 'enabled' as Status }))

// 登录 Mock 与角色管理共用这份角色权限数据，角色调整后下次登录立即生效。
export const getMockRolePermissions = (roleCode: string): string[] => {
  const role = roles.find(item => item.code === roleCode && item.status === 'enabled')
  return role ? [...role.permissionCodes] : []
}

const ok = <T>(data: T, message = '操作成功') => ({ code: 200, message, data })
const pageData = <T>(items: T[], query: Record<string, any>) => {
  const page = Math.max(1, Number(query.page) || 1)
  const pageSize = Math.max(1, Math.min(100, Number(query.pageSize) || 10))
  return { list: items.slice((page - 1) * pageSize, page * pageSize), total: items.length, page, pageSize }
}
const treeMenus = () => {
  const build = (parentId: number): any[] => menus
    .filter(item => item.parentId === parentId)
    .sort((a, b) => a.sort - b.sort)
    .map(item => ({ ...item, children: build(item.id) }))
  return build(0)
}
const nextId = (items: { id: number }[]) => Math.max(0, ...items.map(item => item.id)) + 1

export default [
  {
    url: '/api/admin/roles', method: 'get',
    response: ({ query }) => {
      const keyword = String(query.keyword || '').toLowerCase()
      const result = roles.filter(item => (!keyword || item.name.toLowerCase().includes(keyword) || item.code.includes(keyword)) && (!query.status || item.status === query.status))
      return ok(pageData(result, query), '获取角色列表成功')
    },
  },
  {
    url: '/api/admin/roles', method: 'post',
    response: ({ body }) => {
      if (roles.some(item => item.code === body.code)) return { code: 409, message: '角色编码已存在', data: null }
      const item = { id: nextId(roles), name: body.name, code: body.code, description: body.description || '', status: body.status || 'enabled', permissionCodes: body.permissionCodes || [], createdAt: new Date().toLocaleString('sv-SE') }
      roles.push(item)
      return ok(item, '创建角色成功')
    },
  },
  {
    url: '/api/admin/roles/:id', method: 'put',
    response: ({ body, query }) => {
      const id = Number(query.id)
      const index = roles.findIndex(item => item.id === id)
      if (index < 0) return { code: 404, message: '角色不存在', data: null }
      roles[index] = { ...roles[index], ...body, id }
      return ok(roles[index], '更新角色成功')
    },
  },
  {
    url: '/api/admin/roles/:id', method: 'delete',
    response: ({ query }) => {
      const id = Number(query.id)
      if (id === 1) return { code: 400, message: '超级管理员角色不能删除', data: null }
      roles = roles.filter(item => item.id !== id)
      return ok(null, '删除角色成功')
    },
  },
  {
    url: '/api/admin/menus', method: 'get',
    response: () => ok(treeMenus(), '获取菜单成功'),
  },
  {
    url: '/api/admin/menus', method: 'post',
    response: ({ body }) => {
      const item = { id: nextId(menus), parentId: Number(body.parentId) || 0, name: body.name, path: body.path || '', icon: body.icon || '', type: body.type || 'page', permission: body.permission || '', sort: Number(body.sort) || 1, visible: body.visible !== false, status: body.status || 'enabled' }
      menus.push(item)
      return ok(item, '创建菜单成功')
    },
  },
  {
    url: '/api/admin/menus/:id', method: 'put',
    response: ({ body, query }) => {
      const id = Number(query.id)
      const index = menus.findIndex(item => item.id === id)
      if (index < 0) return { code: 404, message: '菜单不存在', data: null }
      menus[index] = { ...menus[index], ...body, id }
      return ok(menus[index], '更新菜单成功')
    },
  },
  {
    url: '/api/admin/menus/:id', method: 'delete',
    response: ({ query }) => {
      const id = Number(query.id)
      if (menus.some(item => item.parentId === id)) return { code: 400, message: '请先删除该目录下的子菜单', data: null }
      menus = menus.filter(item => item.id !== id)
      return ok(null, '删除菜单成功')
    },
  },
  {
    url: '/api/admin/permissions', method: 'get',
    response: ({ query }) => {
      const keyword = String(query.keyword || '').toLowerCase()
      const result = permissions.filter(item => (!keyword || item.name.includes(keyword) || item.code.includes(keyword) || item.module.includes(keyword)) && (!query.status || item.status === query.status))
      return ok(pageData(result, query), '获取权限列表成功')
    },
  },
] as MockMethod[]
