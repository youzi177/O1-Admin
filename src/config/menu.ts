import type { MenuItem } from '@/types/menu'

export const asidsMenu: MenuItem[] = [
  {
    name: '后台面板', icon: 'i-ep:odometer', path: '/home',
    children: [{ name: '主控台', icon: 'i-ep:home-filled', path: '/', permission: 'dashboard:view' }],
  },
  {
    name: '商城管理', icon: 'i-ep:shop', path: '/goods',
    children: [
      { name: '商品管理', icon: 'i-ep:goods', path: '/goods/list', permission: 'goods:list' },
      { name: '订单管理', icon: 'i-ep:document', path: '/order/list', permission: 'order:list' },
      { name: '用户管理', icon: 'i-ep:user', path: '/user/list', permission: 'user:list' },
    ],
  },
  {
    name: '系统管理', icon: 'i-ep:setting', path: '/system',
    children: [
      { name: '角色管理', icon: 'i-ep:user-filled', path: '/system/role', permission: 'role:list' },
      { name: '菜单管理', icon: 'i-ep:menu', path: '/system/menu', permission: 'menu:list' },
      { name: '权限管理', icon: 'i-ep:lock', path: '/system/permission', permission: 'permission:list' },
    ],
  },
]
