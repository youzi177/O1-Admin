import type { MenuItem } from '@/types/menu'

export const asidsMenu: MenuItem[] = [
  {
    name: '后台面板',
    icon: 'i-ep:odometer',
    path: '/home',
    children: [{ name: '主控台', icon: 'i-ep:home-filled', path: '/', permission: 'dashboard:view' }],
  },
  {
    name: '商城管理',
    icon: 'i-ep:shop',
    path: '/goods',
    children: [
      { name: '商品管理', icon: 'i-ep:goods', path: '/goods/list', permission: 'goods:list' },
      { name: '订单管理', icon: 'i-ep:document', path: '/order/list', permission: 'order:list' },
      { name: '用户管理', icon: 'i-ep:user', path: '/user/list', permission: 'user:list' },
    ],
  },
  {
    name: '系统管理',
    icon: 'i-ep:setting',
    path: '/system',
    children: [
      { name: '角色管理', icon: 'i-ep:user', path: '/system/role', permission: 'role:list' },
      { name: '菜单管理', icon: 'i-ep:menu', path: '/system/menu', permission: 'menu:list' },
      { name: '权限管理', icon: 'i-ep:lock', path: '/system/permission', permission: 'permission:list' },
    ],
  },
]

/** 按当前用户权限，从菜单树中找到第一个可访问的页面。 */
export function getFirstAccessibleMenuPath(permissions: string[]): string | undefined {
  const hasPermission = (permission?: string) =>
    !permission || permissions.includes('*') || permissions.includes(permission)

  const findPath = (items: MenuItem[]): string | undefined => {
    for (const item of items) {
      if (!hasPermission(item.permission)) continue
      if (item.children?.length) {
        const childPath = findPath(item.children)
        if (childPath) return childPath
      } else if (item.path) {
        return item.path
      }
    }
    return undefined
  }

  return findPath(asidsMenu)
}
