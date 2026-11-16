import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { errorHandle } from './errorHandle'
import publicConfig from '@/config'
import { useAuthStore } from '@/stores'
import { doneProgress, startProgress } from '../progress'
export function setupInterceptors(instance: AxiosInstance) {
  //请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      startProgress()
      let isPublic = false
      publicConfig.publicPath.map((path) => {
        isPublic = isPublic || path.test(config.url || '')
      })
      const AuthStore = useAuthStore()
      const token = AuthStore.token
      //鉴权路由并且带有token
      if (!isPublic && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    (error) => {
      doneProgress()
      Promise.reject(error)
    },
  )
  //响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      doneProgress()
      return response.data
    },
    (error) => {
      doneProgress()
      errorHandle(error)
      return Promise.reject(error)
    },
  )
}
