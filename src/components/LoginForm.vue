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

    <div class="demo-accounts">演示账号：管理员 admin / 123456　财务 finance / 123456</div>
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

  // 仅清理用户名首尾空格；密码保持原样，避免改变合法密码。
  form.username = form.username.trim()
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
  --at-apply: text-3xl font-bold;
  margin-bottom: 12px;
  color: var(--o1-text-primary);
}

.login-subtitle {
  --at-apply: text-sm;
  margin-bottom: 36px;
  color: var(--o1-text-secondary);
}

.login-divider {
  --at-apply: flex items-center justify-center gap-3;
  margin-bottom: 28px;
  color: var(--o1-text-secondary);
  font-size: 13px;

  span:first-child,
  span:last-child {
    flex: 1;
    height: 1px;
    background: var(--o1-border-color);
  }
}

.login-form {
  width: 100%;
}

.input-icon {
  width: 18px;
  height: 18px;
  color: var(--o1-text-secondary);
}

.login-button {
  width: 100%;
  height: 42px;
  margin-top: 8px;
  border: none;
  border-radius: 6px;
  font-size: 15px;

  // 正常状态
  --el-button-bg-color: var(--o1-color-primary);
  --el-button-border-color: var(--o1-color-primary);
  --el-button-text-color: #fff;

  // Hover 状态
  --el-button-hover-bg-color: var(--o1-color-primary-hover);
  --el-button-hover-border-color: var(--o1-color-primary-hover);
  --el-button-hover-text-color: #fff;

  // Active 状态
  --el-button-active-bg-color: var(--o1-color-primary-hover);
  --el-button-active-border-color: var(--o1-color-primary-hover);
  --el-button-active-text-color: #fff;

  // 禁用状态
  --el-button-disabled-bg-color: var(--o1-color-primary);
  --el-button-disabled-border-color: var(--o1-color-primary);
  --el-button-disabled-text-color: #fff;
}

.demo-accounts { margin-top: 18px; color: var(--o1-text-secondary); font-size: 12px; text-align: center; line-height: 1.8; }

.login-footer {
  margin-top: 48px;
  color: var(--o1-text-secondary);
  font-size: 12px;
  text-align: center;
}
</style>
