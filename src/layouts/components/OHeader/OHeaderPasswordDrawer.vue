<template>
  <O1Drawer
    v-model="visible"
    title="修改密码"
    class="password-drawer"
    :close-on-click-modal="false"
    @closed="resetForm"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      class="password-form"
      label-width="90px"
      @keyup.enter="onSubmit"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input
          v-model="form.oldpassword"
          placeholder="请输入旧密码"
          show-password
          size="large"
          autocomplete="current-password"
        />
      </el-form-item>

      <el-form-item prop="password" label="新密码">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入新密码"
          show-password
          size="large"
          autocomplete="new-password"
        />
      </el-form-item>

      <el-form-item prop="repassword" label="确认密码">
        <el-input
          v-model="form.repassword"
          type="password"
          placeholder="请输入确认密码"
          show-password
          size="large"
          autocomplete="new-password"
        />
      </el-form-item>

      <el-form-item class="form-actions">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </O1Drawer>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'

const visible = defineModel<boolean>({ required: true })

const formRef = ref<FormInstance>()

const form = reactive({
  oldpassword: '',
  password: '',
  repassword: '',
})

// 表单校验规则
const rules: FormRules = {
  oldpassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  repassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

// 提交修改密码表单
const onSubmit = async () => {
  if (!formRef.value) return

  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  // TODO: 调用修改密码接口
}

// 取消修改密码
const handleCancel = () => {
  visible.value = false
  resetForm()
}

// 抽屉关闭后重置表单
const resetForm = () => {
  formRef.value?.resetFields()
}
</script>

<style scoped>
.password-form {
  width: 100%;
}

.password-form :deep(.el-input) {
  width: 100%;
}

/* 按钮区域 */
.password-form :deep(.form-actions .el-form-item__content) {
  justify-content: flex-start;
  gap: 12px;
}

/* 手机端：Label 和输入框上下排列 */
@media (max-width: 480px) {
  .password-form :deep(.el-form-item) {
    display: block;
    margin-bottom: 20px;
  }

  .password-form :deep(.el-form-item__label) {
    display: block;
    width: 100% !important;
    justify-content: flex-start;
    margin-bottom: 6px;
    text-align: left;
  }

  .password-form :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  /* 提交和取消按钮平分宽度 */
  .password-form :deep(.form-actions .el-button) {
    flex: 1;
    width: 100%;
    margin-left: 0;
  }
}
</style>
