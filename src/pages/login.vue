<template>
  <div class="login-page">
    <el-row class="login-container">
      <!-- 左侧品牌区域 -->
      <el-col :lg="16" :md="12" class="login-brand">
        <LoginBrand />
      </el-col>

      <!-- 右侧登录区域 -->
      <el-col :lg="8" :md="12" class="login-panel">
        <LoginForm :loading="loading" @submit="handleLogin" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
definePage({
  name: 'login',
  meta: {
    requiresAuth: false,
  },
})
import LoginBrand from '../components/LoginBrand.vue'
import LoginForm from '../components/LoginForm.vue'
import { login } from '../api/login'

import { ElMessage } from 'element-plus'
import { useAuthStore, useUserStore } from '@/stores/index.ts'
const AuthStore = useAuthStore()
const UserStore = useUserStore()

const router = useRouter()
const loading = ref(false)

// 登录处理，后续接入 API
const handleLogin = async (formdata: { username: string; password: string }) => {
  loading.value = true
  try {
    const result = await login(formdata)
    const { code, message, token, data } = result
    if (code === 200) {
      if (data.status !== '0') {
        ElMessage.error('账号被禁用，请联系管理员')
        return
      }
      AuthStore.setisLogin(true)
      AuthStore.setToken(token as string)
      UserStore.setUserInfo(data)

      router.push('/')
    } else {
      ElMessage.error(message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
}

.login-container {
  min-height: 100vh;
  background: #fff;
}

.login-brand {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #626aef 0%, #818cf8 100%);
}

.login-panel {
  --at-apply: flex items-center justify-center;
  padding: 40px 24px;
  background: #fff;
}

@media (max-width: 767px) {
  .login-brand {
    display: none;
  }

  .login-panel {
    min-height: 100vh;
    padding: 32px 24px;
  }
}
</style>
