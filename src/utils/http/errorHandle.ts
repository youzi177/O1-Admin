import { ElMessage } from 'element-plus'
import { isAxiosError } from 'axios'

export function errorHandle(error: unknown) {
  if (!isAxiosError(error)) {
    ElMessage.error('请求发生未知错误')
    return
  }

  // 获取后端返回的错误消息（如果存在）
  const data = error.response?.data
  const serverMessage = typeof data?.message === 'string' ? data.message : ''

  // 请求超时
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    ElMessage.error('请求超时，请稍后重试')
    return
  }

  // 服务器没有响应
  if (!error.response) {
    ElMessage.error('网络异常，请检查网络连接')
    return
  }

  // HTTP 状态码
  const status = error.response.status

  const errorMessages: Record<number, string> = {
    400: '请求参数错误',
    401: '登录状态已失效',
    403: '没有访问权限',
    404: '请求的资源不存在',
    405: '请求方法不允许',
    408: '请求超时',
    500: '服务器内部错误',
    502: '网关错误',
    503: '服务暂不可用',
    504: '网关超时',
  }

  ElMessage.error(serverMessage || errorMessages[status] || '请求失败')
}
