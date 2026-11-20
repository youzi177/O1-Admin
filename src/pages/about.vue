<template>
  <div>这是自动路由about</div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'AboutPage',
})

definePage({
  name: 'about',
  meta: {
    requiresAuth: true,
    title: '关于系统',
    keepAlive: true,
    cacheName: 'AboutPage',
  },
})
</script>
