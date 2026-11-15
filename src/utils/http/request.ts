import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { errorHandle } from './errorHandle'

export function setupInterceptors(instance: AxiosInstance) {
  //请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config
    },
    (error) => Promise.reject(error),
  )
  //响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data
    },
    (error) => {
      errorHandle(error)
      return Promise.reject(error)
    },
  )
}
