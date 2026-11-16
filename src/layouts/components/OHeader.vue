<template>
  <header class="f-header">
    <!-- 左侧：Logo 和快捷操作 -->
    <div class="header-left">
      <h1 class="logo">O1 Admin</h1>

      <div class="header-actions">
        <!-- 折叠侧边栏 -->
        <el-tooltip content="折叠侧边栏" placement="bottom">
          <button class="icon-btn" type="button">
            <div class="i-ep:fold"></div>
          </button>
        </el-tooltip>

        <!-- 刷新页面 -->
        <el-tooltip content="刷新页面" placement="bottom">
          <button class="icon-btn" type="button">
            <div class="i-ep:refresh"></div>
          </button>
        </el-tooltip>
      </div>
    </div>

    <!-- 右侧：功能按钮和用户菜单 -->
    <div class="header-right">
      <!-- 全屏按钮：手机端隐藏 -->
      <el-tooltip content="全屏" placement="bottom">
        <button class="icon-btn fullscreen-btn" type="button">
          <div class="i-ep:full-screen"></div>
        </button>
      </el-tooltip>

      <!-- 用户信息：桌面端 hover，移动端 click -->
      <el-dropdown class="dropdown" :trigger="isMobile ? 'click' : 'hover'">
        <button class="user-trigger" type="button">
          <el-avatar :size="28" :src="userInfo.avatar" />
          <span class="username">{{ userInfo.username }}</span>
          <div class="i-ep:arrow-down arrow-icon"></div>
        </button>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores'

const UserStore = useUserStore()

// 判断当前是否为移动端
const isMobile = ref(false)

// 监听窗口尺寸变化，动态切换下拉菜单触发方式
const updateScreen = () => {
  isMobile.value = window.innerWidth <= 480
}

onMounted(() => {
  updateScreen()
  window.addEventListener('resize', updateScreen)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreen)
})

// 用户信息
const userInfo = computed(() => {
  return (
    UserStore.userInfo || {
      username: '',
      avatar: '',
    }
  )
})
</script>

<style scoped>
/* ==================== Header 整体布局 ==================== */

.f-header {
  --header-height: 60px;
  --logo-width: 250px;

  @apply fixed top-0 left-0 right-0 z-50 flex items-center justify-between;

  height: var(--header-height);
  padding: 0 16px 0 0;
  color: #fff;
  background: #626aef;
  box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
}

/* ==================== 左侧区域 ==================== */

.header-left {
  @apply flex items-center h-full;
  min-width: 0;
}

.logo {
  width: var(--logo-width);
  flex-shrink: 0;

  @apply flex justify-center items-center h-full text-2xl font-bold;

  letter-spacing: 0.5px;
}

/* 左侧快捷操作按钮 */
.header-actions {
  @apply flex items-center h-full;
}

/* ==================== 通用图标按钮 ==================== */

.icon-btn {
  @apply flex justify-center items-center;

  width: 40px;
  height: 40px;
  margin: 0 4px;
  padding: 0;
  border: none;
  border-radius: 8px;
  color: inherit;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background: rgb(255 255 255 / 15%);
}

.icon-btn:active {
  background: rgb(255 255 255 / 25%);
}

/* 键盘访问时保留清晰的焦点提示 */
.icon-btn:focus-visible,
.user-trigger:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

/* ==================== 右侧区域 ==================== */

.header-right {
  @apply flex items-center h-full;
  gap: 8px;
}

/* 用户下拉菜单触发区域 */
.user-trigger {
  @apply flex items-center justify-center;

  height: 40px;
  padding: 0 10px;
  gap: 8px;
  color: #fff;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

/* 移除按钮默认 hover、focus 背景效果 */
.user-trigger:hover,
.user-trigger:focus,
.user-trigger:active {
  color: #fff;
  background: transparent;
  outline: none;
}

/* 用户名 */
.username {
  max-width: 120px;
  overflow: hidden;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 下拉箭头 */
.arrow-icon {
  color: #fff;
  font-size: 14px;
}

/* 用户名过长时显示省略号 */
.username {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow-icon {
  font-size: 14px;
}

/* ==================== 平板端适配 ==================== */

@media (max-width: 768px) {
  .f-header {
    --logo-width: 150px;
    padding-right: 8px;
  }

  .logo {
    font-size: 20px;
  }

  .icon-btn {
    width: 36px;
    height: 36px;
    margin: 0 2px;
    font-size: 18px;
  }

  .header-right {
    gap: 2px;
  }

  .user-trigger {
    padding: 0 6px;
    gap: 5px;
  }
}

/* ==================== 手机端适配 ==================== */

@media (max-width: 480px) {
  .f-header {
    --logo-width: auto;
    padding: 0 8px;
  }

  .logo {
    width: auto;
    padding: 0 8px;
    font-size: 18px;
  }

  /* 手机端隐藏用户名，只保留头像 */
  .username {
    display: none;
  }

  /* 手机端隐藏全屏按钮 */
  .fullscreen-btn {
    display: none;
  }

  .icon-btn {
    width: 34px;
    height: 34px;
  }

  .header-actions {
    gap: 0;
  }

  .header-right {
    gap: 0;
  }

  .user-trigger {
    padding: 0 4px;
  }
}
</style>
