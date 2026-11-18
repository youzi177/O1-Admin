<template>
  <!-- 有子菜单 -->
  <el-sub-menu v-if="item.children?.length" :index="item.path || item.name">
    <template #title>
      <div class="menu-title">
        <el-icon v-if="item.icon" class="menu-icon">
          <div :class="item.icon"></div>
        </el-icon>
        <span>{{ item.name }}</span>
      </div>
    </template>

    <!-- 递归渲染子菜单 -->
    <MenuItem v-for="child in item.children" :key="child.path || child.name" :item="child" />
  </el-sub-menu>

  <!-- 普通菜单 -->
  <el-menu-item v-else :index="item.path || item.name">
    <el-icon v-if="item.icon" class="menu-icon">
      <div :class="item.icon"></div>
    </el-icon>
    <template #title>
      <span>{{ item.name }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import type { MenuItem as MenuItemType } from '@/types/menu'

defineProps<{
  item: MenuItemType
}>()
</script>

<style scoped>
.menu-title {
  display: flex;
  align-items: center;
  min-width: 0;
}

.menu-icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  flex-shrink: 0;
}
.menu-title {
  display: flex;
  align-items: center;
  min-width: 0;
  overflow: hidden;
}

.menu-title span {
  white-space: nowrap;
  overflow: hidden;
  transition:
    opacity 0.15s ease,
    width 0.15s ease;
}

.menu-icon {
  flex-shrink: 0;
}
</style>
