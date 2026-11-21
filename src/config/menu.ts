// src/config/menu.ts

import type { MenuItem } from '@/types/menu'

export const asidsMenu: MenuItem[] = [
  {
    name: '后台面板',
    icon: 'i-ep:odometer',
    path: '/home',
    children: [
      {
        name: '主控台',
        icon: 'i-ep:home-filled',
        path: '/',
      },
    ],
  },
  {
    name: '商城管理',
    icon: 'i-ep:shop',
    path: '/goods',
    children: [
      {
        name: '商品管理',
        icon: 'i-ep:goods',
        path: '/goods/list',
      },
      {
        name: '订单管理',
        icon: 'i-ep:document',
        path: '/order/list',
      },
      {
        name: '用户管理',
        icon: 'i-ep:user',
        path: '/user/list',
      },
    ],
  },
  {
    name: '系统管理',
    icon: 'i-ep:setting',
    path: '/system',
    children: [
      {
        name: '角色管理',
        icon: 'i-ep:user-filled',
        path: '/system/role',
      },
      {
        name: '菜单管理',
        icon: 'i-ep:menu',
        path: '/system/menu',
      },
      {
        name: '权限管理',
        icon: 'i-ep:lock',
        path: '/system/permission',
      },
    ],
  },
]
