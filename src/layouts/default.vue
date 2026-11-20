<template>
  <div class="layout-container">
    <el-container direction="vertical">
      <!-- 顶部导航 -->
      <el-header class="layout-header">
        <OHeader
          :is-mobile="isMobile"
          :is-collapsed="isCollapsed"
          @menu-toggle="handleMenuToggle"
        />
      </el-header>

      <!-- 主体区域 -->
      <el-container class="layout-body">
        <!-- PC 端侧边栏 -->
        <el-aside v-if="!isMobile" class="layout-aside" :width="isCollapsed ? '64px' : '240px'">
          <OAside :collapsed="isCollapsed" />
        </el-aside>

        <!-- 页面内容 -->
        <el-main class="layout-main">
          <OTagList />
          <div class="main-content">
            <RouterView v-slot="{ Component }">
              <!-- 最大缓存10个，超过10个，最久页面没有访问的会销毁 -->
              <KeepAlive :max="10">
                <component :is="Component" />
              </KeepAlive>
            </RouterView>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <!-- 移动端全屏菜单 -->
    <el-drawer
      v-model="mobileMenuVisible"
      direction="ltr"
      size="100%"
      :with-header="false"
      :show-close="false"
      :lock-scroll="true"
      class="mobile-menu-drawer"
    >
      <div class="mobile-menu-container">
        <!-- 移动端菜单顶部 -->
        <div class="mobile-menu-header">
          <span class="mobile-menu-title">导航菜单</span>

          <el-button text circle aria-label="关闭菜单" @click="mobileMenuVisible = false">
            <div class="i-ep:close text-xl" />
          </el-button>
        </div>

        <!-- 菜单内容 -->
        <div class="mobile-menu-content">
          <OAside :collapsed="false" @select="mobileMenuVisible = false" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'
import OHeader from './components/OHeader/index.vue'
import OAside from './components/OAside/index.vue'
import OTagList from './components/OTagList/index.vue'

// 屏幕断点：768px
const isMobile = useMediaQuery('(max-width: 768px)')

// PC 端折叠状态
const isCollapsed = ref(false)

// 移动端菜单显示状态
const mobileMenuVisible = ref(false)

// 头部菜单按钮
const handleMenuToggle = () => {
  if (isMobile.value) {
    mobileMenuVisible.value = !mobileMenuVisible.value
  } else {
    isCollapsed.value = !isCollapsed.value
  }
}

// 从移动端切回 PC 时关闭抽屉
watch(isMobile, (mobile) => {
  if (!mobile) {
    mobileMenuVisible.value = false
  }
})
</script>

<style scoped>
.layout-container {
  height: 100vh;
  overflow: hidden;
}

.layout-header {
  height: 60px;
  padding: 0;
}

.layout-body {
  height: calc(100vh - 60px);
  overflow: hidden;
}

.layout-aside {
  height: 100%;
  overflow: hidden;
  border-right: 1px solid var(--o1-border-color);
  transition: width 0.25s ease;
}

.layout-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  /* 缩小一下内边距 */
  --el-main-padding: 15px;
}

/* 移动端 */
@media (max-width: 768px) {
  .layout-main {
    /* 缩小一下内边距 */
    --el-main-padding: 10px;
  }
  .main-content {
    padding: 12px;
  }
}
:global(.mobile-menu-drawer .el-drawer__body) {
  padding: 0;
}
/* 移动端菜单整体 */
.mobile-menu-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* 顶部关闭栏 */
.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid var(--o1-border-color);
}

/* 菜单标题 */
.mobile-menu-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--o1-text-primary);
}

/* 菜单内容 */
.mobile-menu-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.main-content {
  padding: 12px;
  box-sizing: border-box;
}
</style>
