import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAuthStore, useUserStore } from '@/stores'
import { jwtDecode } from 'jwt-decode'
import { getInfo } from '@/api/login'
import type { HttpResponse } from '@/types/api/login'
import { doneProgress, startProgress } from '@/utils/progress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

router.beforeEach(async (to) => {
  startProgress()
  // 动态标题
  const title = (to.meta.title ? to.meta.title : '') + '-O1 Admin'
  document.title = title
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const token = localStorage.getItem('token')
  const userInfoStr = localStorage.getItem('userInfo')
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null
  // 判断目标路由及其父级路由是否需要登录
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // 没有 Token
  if (!token) {
    authStore.setToken('')
    authStore.setisLogin(false)
    if (requiresAuth) {
      return { name: 'login' }
    }
    return true
  }
  // 有Token
  try {
    // 解码 JWT
    const payload = jwtDecode<{ exp?: number; id: string }>(token)
    // 判断 Token 是否过期
    if (!payload.exp || Date.now() >= payload.exp * 1000) {
      throw new Error('Token 已过期')
    }

    // Token 有效，恢复登录状态
    authStore.setToken(token)
    authStore.setisLogin(true)
    userStore.setUserInfo(userInfo)
    // 获取用户信息，并存储到状态管理中
    //在用户每次请求中都应该获取用户最新的信息
    // 因为用户登录之后如果这个时间段被禁用，应该让其退出登录，而不是继续使用
    const result = await getInfo({ uid: payload.id })
    const { code, data } = result as HttpResponse
    if (code === 200) {
      userStore.setUserInfo(data)
    }
    if (userStore.userInfo.status !== '0') {
      ElMessage.error('用户状态异常')
      localStorage.clear()
      return { name: 'login' }
    }
    // 已登录用户禁止进入登录页
    if (to.name === 'login') {
      return { name: 'index' }
    }

    return true
  } catch (error) {
    console.error('Token 验证失败：', error)

    authStore.setToken('')
    authStore.setisLogin(false)
    localStorage.removeItem('token')

    if (requiresAuth) {
      return { name: 'login' }
    }

    return true
  }
})
// 全局的loging
router.afterEach(() => {
  doneProgress()
})
router.onError(() => {
  doneProgress()
})

// 这将在运行时更新路由而无需重新加载页面
if (import.meta.hot) {
  handleHotUpdate(router)
}
export default router
