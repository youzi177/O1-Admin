<template>
  <header
    class="f-header"
    :class="{
      'is-collapsed': isCollapsed,
      'is-mobile': isMobile,
    }"
  >
    <!-- 左侧：品牌区域、菜单折叠、快捷操作 -->
    <div class="header-left">
      <!-- Logo 品牌区域 -->
      <div class="header-brand">
        <span v-if="!isCollapsed || isMobile" class="logo"> O1 Admin </span>
        <span v-else class="logo-mini"> O1 </span>
      </div>

      <!-- 菜单折叠按钮 -->
      <button
        class="icon-btn menu-toggle-btn"
        type="button"
        :aria-label="isMobile ? '打开菜单' : isCollapsed ? '展开菜单' : '折叠菜单'"
        @click="emit('menu-toggle')"
      >
        <div :class="isMobile ? 'i-ep:menu' : isCollapsed ? 'i-ep:expand' : 'i-ep:fold'"></div>
      </button>

      <!-- 快捷操作 -->
      <OHeaderActions class="header-actions" @refresh="handleRefresh" />
    </div>

    <!-- 右侧：主题、全屏和用户菜单 -->
    <div class="header-right">
      <O1ThemeSwitch />

      <!-- 手机端隐藏全屏按钮 -->
      <el-tooltip v-if="!isMobile" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
        <button
          class="icon-btn fullscreen-btn"
          type="button"
          :aria-label="isFullscreen ? '退出全屏' : '全屏'"
          @click="toggle"
        >
          <div :class="isFullscreen ? 'i-ep:aim' : 'i-ep:full-screen'"></div>
        </button>
      </el-tooltip>

      <OHeaderUserMenu :user-info="userInfo" :is-mobile="isMobile" @command="handleCommand" />
    </div>

    <!-- 修改密码抽屉 -->
    <OHeaderPasswordDrawer v-model="passwordDrawerVisible" />
  </header>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { useAuthStore, useUserStore } from '@/stores'
import OHeaderActions from './OHeaderActions.vue'
import OHeaderUserMenu from './OHeaderUserMenu.vue'
import OHeaderPasswordDrawer from './OHeaderPasswordDrawer.vue'

const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()

const props = defineProps<{
  isMobile: boolean
  isCollapsed: boolean
}>()

const emit = defineEmits<{
  'menu-toggle': []
}>()

const { isMobile, isCollapsed } = toRefs(props)

// 用户信息
const userInfo = computed(() => {
  return (
    userStore.userInfo || {
      username: '',
      avatar: '',
    }
  )
})

// 全屏功能
const { isFullscreen, toggle } = useFullscreen()

// 修改密码抽屉显示状态
const passwordDrawerVisible = ref(false)

// 处理用户菜单命令
const handleCommand = (command: string) => {
  switch (command) {
    case 'rePassword':
      passwordDrawerVisible.value = true
      break
    case 'logout':
      handleLogout()
      break
  }
}

// 退出登录
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('是否退出登录', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    localStorage.removeItem('token')
    localStorage.removeItem('userinfo')

    // 清空 Pinia 中的用户信息和登录状态
    userStore.clearUserInfo()
    authStore.setisLogin(false)
    authStore.setToken('')

    await router.push({ name: 'login' })
  } catch {
    // 用户取消退出时不需要额外处理
  }
}

// 刷新当前页面
const handleRefresh = () => {
  location.reload()
}
</script>

<style scoped>
/* Header 整体布局 */
.f-header {
  --header-height: 60px;

  @apply fixed top-0 left-0 right-0 z-50 flex items-center justify-between;

  height: var(--header-height);
  padding: 0 16px 0 0;
  color: var(--o1-text-primary);
  background: var(--o1-bg-container);
  border-bottom: 1px solid var(--o1-border-color);
  box-shadow: 0 2px 8px rgb(0 0 0 / 5%);

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

/* 左侧区域 */
.header-left {
  @apply flex items-center h-full;
  min-width: 0;
}

/* Logo 品牌区域 */
.header-brand {
  width: 240px;
  height: 100%;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: width 0.2s ease;
}

/* 完整 Logo */
.logo {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--o1-color-primary);
  white-space: nowrap;
}

/* 折叠后的 Logo */
.logo-mini {
  font-size: 22px;
  font-weight: 700;
  color: var(--o1-color-primary);
}

/* 侧边栏折叠 */
.f-header.is-collapsed .header-brand {
  width: 64px;
}

/* 右侧区域 */
.header-right {
  @apply flex items-center h-full;
  gap: 8px;
}

/* 通用图标按钮 */
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

/* 菜单按钮 */
.menu-toggle-btn {
  flex-shrink: 0;
}

/* 平板及手机端 */
@media (max-width: 768px) {
  .f-header {
    padding: 0 8px;
  }

  /* 移动端取消固定品牌宽度 */
  .header-brand {
    width: auto;
    padding: 0 8px;
  }

  /* 手机端不受桌面折叠状态影响 */
  .f-header.is-collapsed .header-brand {
    width: auto;
  }

  .logo {
    font-size: 18px;
  }

  .logo-mini {
    font-size: 18px;
  }

  .header-left {
    gap: 0;
  }

  .header-right {
    gap: 2px;
  }

  .icon-btn {
    margin: 0 2px;
  }
}
</style>
