<template>
  <div class="page-container">
    <div class="info-item">当前的token:{{ token }}</div>
    <div class="info-item">当前的用户信息:{{ userinfo }}</div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'HomePage',
})

definePage({
  name: 'index',
  meta: {
    requiresAuth: true,
    title: '首页',
    affix: true,
    keepAlive: true,
    cacheName: 'HomePage',
  },
})

import { useAuthStore, useUserStore } from '@/stores/index.ts'

const AuthStore = useAuthStore()
const UserStore = useUserStore()

const token = AuthStore.token
const userinfo = UserStore.userInfo
</script>

<style scoped>
.page-container {
  width: 100%;
  min-width: 0;
}

.info-item {
  max-width: 100%;
  overflow-wrap: anywhere;
  margin-bottom: 16px;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
