import { post } from '@/utils/http'
import type { LoginInfo, HttpResponse } from '@/types/api/login'

//登录接口
export const login = (option: LoginInfo) => {
  return post<HttpResponse>('/api/admin/login', { ...option })
}
