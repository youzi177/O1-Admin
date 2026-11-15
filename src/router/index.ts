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

  // 没有 Token
  if (!token) {
    authStore.setToken('')
    authStore.setisLogin(false)

    if (requiresAuth) {
      return { name: 'login' }
    }

    return true
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

// 这将在运行时更新路由而无需重新加载页面
if (import.meta.hot) {
  handleHotUpdate(router)
}
export default router
