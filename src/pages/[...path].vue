```vue
<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <!-- 404 数字 -->
      <div class="not-found-code">404</div>

      <!-- 提示信息 -->
      <h2 class="not-found-title">哎呀，页面走丢了！</h2>

      <p class="not-found-description">你访问的页面不存在、已被删除，或者地址输入有误。</p>

      <!-- 操作按钮 -->
      <div class="not-found-actions">
        <el-button @click="router.back()">返回上一页</el-button>
        <el-button type="primary" @click="router.push('/')">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePage({
  name: '404',
  meta: {
    requiresAuth: false,
    title: '404页面',
    layout: false,
  },
})

const router = useRouter()
</script>

<style scoped>
.not-found-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  background: var(--o1-bg-page);
}

.not-found-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.not-found-code {
  margin-bottom: 24px;
  color: var(--o1-color-primary);
  font-size: clamp(100px, 18vw, 150px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.1em;
  opacity: 0.18;
  user-select: none;
}

.not-found-title {
  margin: 0 0 12px;
  color: var(--o1-text-primary);
  font-size: 24px;
  font-weight: 600;
}

.not-found-description {
  margin: 0 0 32px;
  color: var(--o1-text-secondary);
  font-size: 14px;
}

.not-found-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}

@media (max-width: 480px) {
  .not-found-title {
    font-size: 20px;
  }

  .not-found-description {
    max-width: 300px;
    line-height: 1.7;
  }
}
</style>
```
