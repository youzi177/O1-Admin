<template>
  <div class="page-container">
    <div class="info-item">当前的token:{{ token }}</div>
    <div class="info-item">当前的用户信息:{{ userinfo }}</div>
  </div>
</template>

<script lang="ts" setup>
definePage({
  name: 'index',
  meta: {
    requiresAuth: true,
    title: '首页', //标签和浏览器标题
    affix: true, //标签是否可关闭
  },
})
import { useAuthStore, useUserStore } from '@/stores/index.ts'

const AuthStore = useAuthStore()
const UserStore = useUserStore()

const token = AuthStore.token
const userinfo = UserStore.userInfo
</script>

<style>
.menu-icon {
  width: 24px;
  height: 24px;
}
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
