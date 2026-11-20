<template>
  <div class="f-tag-list">
    <!-- 左侧：路由标签 -->
    <el-tabs v-model="activeTab" class="tag-tabs" @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="!item.affix"
      />
    </el-tabs>

    <!-- 右侧：标签操作 -->
    <el-dropdown
      trigger="hover"
      class="tag-actions"
      :show-timeout="150"
      :hide-timeout="200"
      @command="handleCommand"
    >
      <button class="tag-action-btn" type="button" aria-label="标签页操作">
        <div class="i-ep:arrow-down arrow-icon" />
      </button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="close-current"> 关闭当前标签 </el-dropdown-item>
          <el-dropdown-item command="close-left"> 关闭左侧标签 </el-dropdown-item>
          <el-dropdown-item command="close-right"> 关闭右侧标签 </el-dropdown-item>
          <el-dropdown-item command="close-others"> 关闭其他标签 </el-dropdown-item>
          <el-dropdown-item divided command="close-all"> 关闭全部标签 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useListTab } from '@/composables/useListTab'

const { tabs, activeTab, removeTab, handleCommand } = useListTab()
</script>

<style scoped>
.f-tag-list {
  @apply flex items-center;
  width: 100%;
  height: 44px;
  flex-shrink: 0;
  padding: 0 16px 0 12px;
  box-sizing: border-box;
  background: var(--o1-bg-container);
  border-bottom: 1px solid var(--o1-border-color);
}

.tag-tabs {
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: hidden;
}

/* 去掉 Element Plus 默认底部边框和间距 */
:deep(.el-tabs__header) {
  margin: 0;
  border-bottom: none;
}

:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-tabs__nav-wrap) {
  height: 100%;
}

:deep(.el-tabs__nav-scroll),
:deep(.el-tabs__nav) {
  height: 100%;
}

/* 标签 */
:deep(.el-tabs__item) {
  position: relative;
  height: 44px;
  line-height: 44px;
  padding: 0 16px;
  color: var(--o1-text-secondary);
  border: none;
  font-size: 13px;
  transition: color 0.2s ease;
}

:deep(.el-tabs__item:hover) {
  color: var(--o1-color-primary);
}

:deep(.el-tabs__item.is-active) {
  color: var(--o1-color-primary);
  font-weight: 500;
}

/* 当前标签下划线：固定宽度，水平居中 */
:deep(.el-tabs__item.is-active::after) {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 24px;
  height: 2px;
  background: var(--o1-color-primary);
  border-radius: 2px;
  content: '';
  transform: translateX(-50%);
}

/* 关闭按钮 */
:deep(.el-tabs__item .el-icon.is-icon-close) {
  margin-left: 6px;
  border-radius: 50%;
}

:deep(.el-tabs__item .el-icon.is-icon-close:hover) {
  color: var(--o1-color-primary);
  background: var(--o1-bg-hover);
}

/* 右侧操作区域 */
.tag-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-left: 8px;
  padding-left: 8px;
  border-left: 1px solid var(--o1-border-color);
}

.tag-action-btn {
  @apply flex items-center justify-center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--o1-text-secondary);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-action-btn:hover {
  color: var(--o1-text-primary);
  background: var(--o1-bg-hover);
}

.tag-action-btn:focus-visible {
  outline: 2px solid var(--o1-color-primary);
  outline-offset: 2px;
}

.arrow-icon {
  font-size: 16px;
}
:deep(.tag-actions .tag-action-btn),
:deep(.tag-actions .tag-action-btn:hover),
:deep(.tag-actions .tag-action-btn:active),
:deep(.tag-actions .tag-action-btn:focus),
:deep(.tag-actions .tag-action-btn:focus-visible) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

:deep(.tag-actions .tag-action-btn:hover) {
  color: var(--o1-text-primary);
  background: var(--o1-bg-hover);
}
</style>
