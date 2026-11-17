<template>
  <header class="f-header">
    <!-- 左侧：Logo 和快捷操作 -->
    <div class="header-left">
      <h1 class="logo">O1 Admin</h1>
      <OHeaderActions @refresh="handleRefresh" />
    </div>

    <!-- 右侧：主题、全屏和用户菜单 -->
    <div class="header-right">
      <O1ThemeSwitch />

      <!-- 手机端隐藏全屏按钮 -->
      <el-tooltip v-if="!isMobile" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
        <button class="icon-btn fullscreen-btn" type="button" @click="toggle">
          <div :class="isFullscreen ? 'i-ep:aim' : 'i-ep:full-screen'"></div>
        </button>
      </el-tooltip>

      <OHeaderUserMenu :user-info="userInfo" :is-mobile="isMobile" @command="handleCommand" />
    </div>

    <!-- 修改密码抽屉：复用项目级通用抽屉 -->
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

// 当前屏幕是否为移动端
const isMobile = ref(false)

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
  --logo-width: 250px;

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

.logo {
  width: var(--logo-width);
  flex-shrink: 0;
  @apply flex justify-center items-center h-full text-2xl font-bold;
  letter-spacing: 0.5px;
  color: var(--o1-primary);
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
  outline: 2px solid var(--o1-primary);
  outline-offset: 2px;
}

/* 平板端 */
@media (max-width: 768px) {
  .f-header {
    --logo-width: 150px;
    padding-right: 8px;
  }

  .logo {
    font-size: 20px;
  }

  .header-right {
    gap: 2px;
  }
}

/* 手机端 */
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

  .header-right {
    gap: 0;
  }
}
</style>
