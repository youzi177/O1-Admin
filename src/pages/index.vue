<template>
  <div>当前的token:{{ token }}</div>
</template>

<script lang="ts" setup>
definePage({
  name: 'index',
  meta: {
    requiresAuth: true,
  },
})

import { useAuthStore } from '@/stores/index.ts'
const AuthStore = useAuthStore()
const token = AuthStore.token
</script>

<style></style>
<route lang="yaml">
meta:
  layout: default
</route>
