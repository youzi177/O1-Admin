<template>
  <div>当前的token:{{ token }}</div>
  <div>当前的用户信息:{{ userinfo }}</div>
</template>

<script lang="ts" setup>
definePage({
  name: 'index',
  meta: {
    requiresAuth: true,
  },
})
import { useAuthStore, useUserStore } from '@/stores/index.ts'
const AuthStore = useAuthStore()
const UserStore = useUserStore()

const token = AuthStore.token
const userinfo = UserStore.userInfo
</script>

<style></style>
<route lang="yaml">
meta:
  layout: default
</route>
