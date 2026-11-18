<template>
  <div class="f-menu">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :collapse="collapsed"
      :collapse-transition="false"
      router
      @select="emit('select')"
    >
      <MenuItem v-for="item in asidsMenu" :key="item.path || item.name" :item="item" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import { asidsMenu } from '@/config/menu'

defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  select: []
}>()

const route = useRoute()

const activeMenu = computed(() => route.path)
</script>

<style scoped>
.f-menu {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.el-menu {
  width: 100%;
  height: 100%;
  border-right: none;
}

.el-menu--collapse :deep(.menu-title span) {
  display: none;
}
</style>
