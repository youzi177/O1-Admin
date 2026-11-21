import { post, get } from '@/utils/http'
import type { LoginInfo, HttpResponse } from '@/types/api/login'
import qs from 'qs'

// 登录接口：用户名首尾空格不参与身份匹配，密码保持原样。
export const login = (option: LoginInfo) => {
  return post<HttpResponse>('/api/admin/login', { ...option, username: option.username.trim() })
}

// 获取用户基本信息
export const getInfo = (param: { uid: string }) => {
  return get('/api/admin/info?' + qs.stringify(param))
}
