<template>
  <el-tooltip :content="themeStore.isDark ? '切换明亮模式' : '切换暗黑模式'" placement="bottom">
    <button
      class="theme-switch"
      type="button"
      role="switch"
      :aria-checked="themeStore.isDark"
      :aria-label="themeStore.isDark ? '切换明亮模式' : '切换暗黑模式'"
      @click="toggleTheme"
    >
      <span class="theme-switch__thumb">
        <!-- 太阳图标 -->
        <svg
          class="theme-switch__icon theme-switch__sun"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
          />
        </svg>

        <!-- 月亮图标 -->
        <svg
          class="theme-switch__icon theme-switch__moon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
        </svg>
      </span>
    </button>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme'

const themeStore = useThemeStore()

// 在明亮和暗黑模式之间切换
const toggleTheme = () => {
  themeStore.setMode(themeStore.isDark ? 'light' : 'dark')
}
</script>

<style scoped>
.theme-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 46px;
  height: 26px;
  padding: 3px;

  border: 1px solid var(--o1-border-color);
  border-radius: 20px;

  /* 胶囊背景 */
  background-color: var(--o1-bg-hover);

  cursor: pointer;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

/* 滑动圆形区域 */
.theme-switch__thumb {
  position: absolute;
  left: 3px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 18px;
  height: 18px;

  border: 1px solid var(--o1-border-color);
  border-radius: 50%;

  /* 滑块与轨道形成明显对比 */
  background-color: var(--o1-bg-container);

  box-shadow:
    0 1px 3px rgb(0 0 0 / 12%),
    0 0 1px rgb(0 0 0 / 15%);

  transition:
    transform 0.3s ease,
    background-color 0.25s ease,
    border-color 0.25s ease;
}

/* 图标 */
.theme-switch__icon {
  position: absolute;
  width: 13px;
  height: 13px;

  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;

  transition:
    opacity 0.2s ease,
    transform 0.3s ease;
}

/* 明亮模式 */
.theme-switch__sun {
  color: #e6a23c;
  opacity: 1;
}

.theme-switch__moon {
  color: #409eff;
  opacity: 0;
  transform: rotate(-45deg) scale(0.5);
}

/* 暗黑模式 */
.theme-switch[aria-checked='true'] .theme-switch__thumb {
  transform: translateX(20px);
}

.theme-switch[aria-checked='true'] .theme-switch__sun {
  opacity: 0;
  transform: rotate(45deg) scale(0.5);
}

.theme-switch[aria-checked='true'] .theme-switch__moon {
  opacity: 1;
  transform: rotate(0) scale(1);
}

/* Hover 状态 */
.theme-switch:hover {
  border-color: var(--o1-primary);
}

/* 键盘焦点 */
.theme-switch:focus-visible {
  outline: 2px solid var(--o1-primary);
  outline-offset: 3px;
}
</style>
