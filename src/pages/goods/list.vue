<template>
  <div>商品管理</div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'GoodsListPage',
})

definePage({
  name: 'list',
  meta: {
    requiresAuth: true,
    title: '商品管理',
    keepAlive: true,
    cacheName: 'GoodsListPage',
  },
})
</script>
