<template>
  <div class="f-menu">
    <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" :collapse="collapsed" :collapse-transition="false" router @select="emit('select')">
      <MenuItem v-for="item in visibleMenus" :key="item.path || item.name" :item="item" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import { asidsMenu } from '@/config/menu'
import { useUserStore } from '@/stores'
import type { MenuItem as MenuItemType } from '@/types/menu'

defineProps<{ collapsed: boolean }>()
const emit = defineEmits<{ select: [] }>()
const route = useRoute()
const userStore = useUserStore()
const activeMenu = computed(() => route.path)

function filterMenus(items: MenuItemType[]): MenuItemType[] {
  return items.reduce<MenuItemType[]>((result, item) => {
    const children = item.children ? filterMenus(item.children) : []
    const permitted = !item.permission || userStore.hasPermission(item.permission)
    if (!permitted || (item.children && children.length === 0)) return result
    result.push({ ...item, ...(item.children ? { children } : {}) })
    return result
  }, [])
}

const visibleMenus = computed(() => filterMenus(asidsMenu))
</script>

<style scoped>
.f-menu { width: 100%; height: 100%; overflow-y: auto; overflow-x: hidden; }
.el-menu { width: 100%; height: 100%; border-right: none; }
.el-menu--collapse :deep(.menu-title span) { display: none; }
</style>
