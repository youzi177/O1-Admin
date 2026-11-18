<template>
  <div class="f-menu">
    <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" router>
      <MenuItem v-for="item in asidsMenu" :key="item.path || item.name" :item="item" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import { asidsMenu } from '@/config/menu'

const route = useRoute()

const activeMenu = computed(() => route.path)
</script>

<style scoped>
.f-menu {
  @apply fixed h-full w-64 shadow-2xl;
}
</style>
