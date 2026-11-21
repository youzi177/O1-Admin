import { del, get, post, put } from '@/utils/http'
import type { ApiResult, PageResult, SystemMenu, SystemPermission, SystemRole } from '@/types/api/system'

export interface ListParams {
  page?: number
  pageSize?: number
  keyword?: string
  status?: string
}

const queryString = (params: ListParams) => {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, String(value))
  })
  return query.toString()
}

export const getRoles = (params: ListParams) =>
  get<ApiResult<PageResult<SystemRole>>>(`/api/admin/roles?${queryString(params)}`)
export const createRole = (data: Partial<SystemRole>) =>
  post<ApiResult<SystemRole>>('/api/admin/roles', data)
export const updateRole = (id: number, data: Partial<SystemRole>) =>
  put<ApiResult<SystemRole>>(`/api/admin/roles/${id}`, data)
export const deleteRole = (id: number) =>
  del<ApiResult<null>>(`/api/admin/roles/${id}`)

export const getMenus = () => get<ApiResult<SystemMenu[]>>('/api/admin/menus')
export const createMenu = (data: Partial<SystemMenu>) =>
  post<ApiResult<SystemMenu>>('/api/admin/menus', data)
export const updateMenu = (id: number, data: Partial<SystemMenu>) =>
  put<ApiResult<SystemMenu>>(`/api/admin/menus/${id}`, data)
export const deleteMenu = (id: number) =>
  del<ApiResult<null>>(`/api/admin/menus/${id}`)

export const getPermissions = (params: ListParams) =>
  get<ApiResult<PageResult<SystemPermission>>>(`/api/admin/permissions?${queryString(params)}`)
