<template>
  <el-dropdown
    class="dropdown"
    :trigger="isMobile ? 'click' : 'hover'"
    @command="$emit('command', $event)"
  >
    <button class="user-trigger" type="button">
      <el-avatar :size="28" :src="userInfo.avatar" />
      <span class="username">{{ userInfo.username }}</span>
      <div class="i-ep:arrow-down arrow-icon"></div>
    </button>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
        <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
interface UserInfo {
  username: string
  avatar: string
}

defineProps<{
  userInfo: UserInfo
  isMobile: boolean
}>()

defineEmits<{
  command: [command: string]
}>()
</script>

<style scoped>
/* 用户信息区域不使用按钮式 Hover 效果 */
.user-trigger {
  @apply flex items-center justify-center;
  height: 40px;
  padding: 0 10px;
  gap: 8px;
  color: var(--o1-text-primary);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.user-trigger:hover,
.user-trigger:focus,
.user-trigger:active {
  color: var(--o1-text-primary);
  background: transparent;
  outline: none;
}

.user-trigger:focus-visible {
  outline: 2px solid var(--o1-primary);
  outline-offset: 2px;
}

/* 用户名 */
.username {
  max-width: 120px;
  overflow: hidden;
  color: var(--o1-text-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 下拉箭头 */
.arrow-icon {
  color: var(--o1-text-secondary);
  font-size: 14px;
}

@media (max-width: 768px) {
  .user-trigger {
    padding: 0 6px;
    gap: 5px;
  }
}

@media (max-width: 480px) {
  .username {
    display: none;
  }

  .user-trigger {
    padding: 0 4px;
  }
}
</style>
