import NProgress from './nprogress'
// 解决路由和 Axios 进度条冲突
let requestCount = 0
/**
 * 开始一个加载任务
 */
export function startProgress() {
  requestCount++

  if (requestCount === 1) {
    NProgress.start()
  }
}
/**
 * 结束一个加载任务
 */
export function doneProgress() {
  requestCount = Math.max(0, requestCount - 1)

  if (requestCount === 0) {
    NProgress.done()
  }
}
