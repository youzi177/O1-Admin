import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAuthStore } from '@/stores'
import { jwtDecode } from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const token = localStorage.getItem('token')

  // 判断目标路由及其父级路由是否需要登录
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // 不需要登录，直接放行
  if (!requiresAuth) {
    return true
  }

  // 没有 Token，清理登录状态并跳转登录页
  if (!token) {
    authStore.setToken('')
    authStore.setisLogin(false)
    return { name: 'login' }
  }

  try {
    // 解码 JWT
    const payload = jwtDecode<{ exp?: number }>(token)

    // 判断 Token 是否过期
    if (!payload.exp || Date.now() >= payload.exp * 1000) {
      throw new Error('Token 已过期')
    }

    // Token 有效，恢复登录状态
    authStore.setToken(token)
    authStore.setisLogin(true)

    return true
  } catch (error) {
    console.error('Token 验证失败：', error)

    authStore.setToken('')
    authStore.setisLogin(false)
    localStorage.removeItem('token')

    return { name: 'login' }
  }
})

// 这将在运行时更新路由而无需重新加载页面
if (import.meta.hot) {
  handleHotUpdate(router)
}
export default router
