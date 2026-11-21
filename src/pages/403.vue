<template>
  <div class="forbidden-page">
    <div class="code">403</div>
    <h2>暂无访问权限</h2>
    <p>当前账号没有访问该页面的权限，请联系管理员。</p>
    <el-button type="primary" @click="router.push('/')">返回首页</el-button>
  </div>
</template>

<script lang="ts" setup>
definePage({ name: 'forbidden', meta: { requiresAuth: true, title: '无权访问', hideTab: true } })
const router = useRouter()
</script>

<style scoped>
.forbidden-page { display: flex; min-height: 60vh; flex-direction: column; align-items: center; justify-content: center; gap: 12px; text-align: center; }
.code { color: var(--o1-color-primary); font-size: 88px; font-weight: 800; line-height: 1; }
h2 { margin: 8px 0 0; color: var(--o1-text-primary); font-size: 22px; }
p { margin: 0 0 12px; color: var(--o1-text-secondary); }
</style>
