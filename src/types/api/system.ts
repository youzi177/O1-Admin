export interface ApiResult<T> {
  code: number
  message: string
  data: T
}

export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface SystemRole {
  id: number
  name: string
  code: string
  description: string
  status: 'enabled' | 'disabled'
  permissionCodes: string[]
  createdAt: string
}

export interface SystemMenu {
  id: number
  parentId: number
  name: string
  path: string
  icon: string
  type: 'directory' | 'page' | 'button'
  permission: string
  sort: number
  visible: boolean
  status: 'enabled' | 'disabled'
  children?: SystemMenu[]
}

export interface SystemPermission {
  id: number
  name: string
  code: string
  module: string
  action: string
  method: string
  api: string
  description: string
  status: 'enabled' | 'disabled'
}
