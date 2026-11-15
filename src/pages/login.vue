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
import LoginBrand from '../components/LoginBrand.vue'
import LoginForm from '../components/LoginForm.vue'

const loading = ref(false)

// 登录处理，后续接入 API
const handleLogin = async (data: { username: string; password: string }) => {
  console.log('登录信息：', data)
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
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
