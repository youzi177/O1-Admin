<template>
  <div class="header-actions">
    <!-- 折叠侧边栏：后续接入布局状态 -->
    <el-tooltip content="折叠侧边栏" placement="bottom">
      <button class="icon-btn" type="button">
        <div class="i-ep:fold"></div>
      </button>
    </el-tooltip>

    <!-- 刷新当前页面 -->
    <el-tooltip content="刷新页面" placement="bottom">
      <button class="icon-btn" type="button" @click="$emit('refresh')">
        <div class="i-ep:refresh"></div>
      </button>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  refresh: []
}>()
</script>

<style scoped>
.header-actions {
  @apply flex items-center h-full;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 40px;
  height: 40px;
  margin: 0 4px;
  padding: 0;
  border: none;
  border-radius: 8px;
  color: var(--o1-text-secondary);
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.icon-btn:hover {
  color: var(--o1-text-primary);
  background: var(--o1-bg-hover);
}

.icon-btn:active {
  background: var(--o1-border-color);
}

.icon-btn:focus-visible {
  outline: 2px solid var(--o1-color-primary);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .icon-btn {
    width: 36px;
    height: 36px;
    margin: 0 2px;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .header-actions {
    gap: 0;
  }

  .icon-btn {
    width: 34px;
    height: 34px;
  }
}
</style>
