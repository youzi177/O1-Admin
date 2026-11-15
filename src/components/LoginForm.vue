<template>
  <div class="login-content">
    <h2 class="login-title">欢迎回来</h2>
    <p class="login-subtitle">请输入账号密码登录系统</p>

    <div class="login-divider">
      <span></span>
      <span>账号密码登录</span>
      <span></span>
    </div>

    <el-form ref="formRef" :model="form" :rules="rules" class="login-form" @keyup.enter="onSubmit">
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          size="large"
          autocomplete="username"
        >
          <template #prefix>
            <div class="i-ep:user input-icon"></div>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          show-password
          size="large"
          autocomplete="current-password"
        >
          <template #prefix>
            <div class="i-ep:lock input-icon"></div>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="login-button" :loading="loading" @click="onSubmit">
          登录
        </el-button>
      </el-form-item>
    </el-form>

    <div class="login-footer">© 2026 O1 Admin. All rights reserved.</div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'

// Props & Emits
defineProps<{
  loading: boolean
}>()
const emit = defineEmits<{
  submit: [data: { username: string; password: string }]
}>()

// 表单数据
const formRef = ref<FormInstance>()
const form = reactive({
  username: '',
  password: '',
})

// 表单验证规则
const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

// 提交表单
const onSubmit = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  emit('submit', {
    username: form.username,
    password: form.password,
  })
}
</script>

<style lang="scss" scoped>
.login-content {
  width: 100%;
  max-width: 360px;
}

.login-title {
  --at-apply: text-3xl font-bold text-gray-800;
  margin-bottom: 12px;
}

.login-subtitle {
  --at-apply: text-sm text-gray-400;
  margin-bottom: 36px;
}

.login-divider {
  --at-apply: flex items-center justify-center gap-3;
  margin-bottom: 28px;
  color: #a1a1aa;
  font-size: 13px;

  span:first-child,
  span:last-child {
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
}

.login-form {
  width: 100%;
}

.input-icon {
  width: 18px;
  height: 18px;
  color: #9ca3af;
}

.login-button {
  width: 100%;
  height: 42px;
  margin-top: 8px;
  border: none;
  border-radius: 6px;
  background: #626aef;
  font-size: 15px;

  &:hover {
    background: #5158d8;
  }
}

.login-footer {
  margin-top: 48px;
  color: #a1a1aa;
  font-size: 12px;
  text-align: center;
}
</style>
