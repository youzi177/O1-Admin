import { post, get } from '@/utils/http'
import type { LoginInfo, HttpResponse } from '@/types/api/login'
import qs from 'qs'
//登录接口
export const login = (option: LoginInfo) => {
  return post<HttpResponse>('/api/admin/login', { ...option })
}
// 获取用户基本信息
export const getInfo = (param: { uid: string }) => {
  return get('/api/admin/info?' + qs.stringify(param))
}
