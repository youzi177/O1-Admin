import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { setupInterceptors } from './request'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

// GET
export function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.get(url, config).then((res) => res as T)
}

// POST
export function post<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<T> {
  return instance.post(url, data, config).then((res) => res as T)
}

// PUT
export function put<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<T> {
  return instance.put(url, data, config).then((res) => res as T)
}

// DELETE
export function del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.delete(url, config).then((res) => res as T)
}

setupInterceptors(instance)

export { instance as axios }
