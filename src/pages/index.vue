<template>
  <div>当前的token:{{ token }}</div>
  <div>当前的用户信息:{{ userinfo }}</div>
  <el-button @click="logout">退出登录</el-button>
</template>

<script lang="ts" setup>
definePage({
  name: 'index',
  meta: {
    requiresAuth: true,
  },
})
import { useAuthStore, useUserStore } from '@/stores/index.ts'
import { ElMessageBox } from 'element-plus'
const AuthStore = useAuthStore()
const UserStore = useUserStore()

const router = useRouter()

const token = AuthStore.token
const userinfo = UserStore.userInfo
const logout = () => {
  ElMessageBox.confirm('是否退出登录', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      localStorage.clear()
      // 清空 Pinia 中的用户信息
      UserStore.clearUserInfo()
      AuthStore.setisLogin(false)
      AuthStore.setToken('')
      //跳转到首页
      router.push({ name: 'login' })
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style></style>
<route lang="yaml">
meta:
  layout: default
</route>
