import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAuthStore, useUserStore } from '@/stores'
import { jwtDecode } from 'jwt-decode'
import { getInfo } from '@/api/login'
import type { HttpResponse } from '@/types/api/login'
import { doneProgress, startProgress } from '@/utils/progress'

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes: setupLayouts(routes) })

router.beforeEach(async to => {
  startProgress()
  document.title = (to.meta.title ? to.meta.title : '') + '-O1 Admin'
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const token = localStorage.getItem('token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!token) {
    authStore.setToken('')
    authStore.setisLogin(false)
    userStore.clearUserInfo()
    if (requiresAuth) return { name: 'login' }
    return true
  }

  try {
    const payload = jwtDecode<{ exp?: number; id: string }>(token)
    if (!payload.exp || Date.now() >= payload.exp * 1000) throw new Error('Token 已过期')
    authStore.setToken(token)
    authStore.setisLogin(true)

    const result = await getInfo({ uid: payload.id })
    const { code, data } = result as HttpResponse
    if (code !== 200 || !data) throw new Error('获取用户信息失败')
    userStore.setUserInfo(data)

    if (userStore.userInfo.status !== '0') {
      ElMessage.error('用户状态异常')
      authStore.setToken('')
      authStore.setisLogin(false)
      userStore.clearUserInfo()
      return { name: 'login' }
    }
    if (to.name === 'login') return { name: 'index' }

    const requiredPermission = to.meta.permission as string | undefined
    if (requiredPermission && !userStore.hasPermission(requiredPermission)) {
      ElMessage.warning('当前账号没有访问该页面的权限')
      return { name: 'forbidden' }
    }
    return true
  } catch (error) {
    console.error('Token 验证失败：', error)
    authStore.setToken('')
    authStore.setisLogin(false)
    userStore.clearUserInfo()
    if (requiresAuth) return { name: 'login' }
    return true
  }
})

router.afterEach(() => doneProgress())
router.onError(() => doneProgress())
if (import.meta.hot) handleHotUpdate(router)
export default router
