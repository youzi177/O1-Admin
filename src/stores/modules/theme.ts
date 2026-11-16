import { ref } from 'vue'
import { defineStore } from 'pinia'

export type ThemeMode = 'system' | 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('system')
  const isDark = ref(false)

  let mediaQuery: MediaQueryList | null = null

  // 将主题应用到 HTML 根节点
  const applyTheme = (dark: boolean) => {
    isDark.value = dark

    const html = document.documentElement

    html.classList.toggle('dark', dark)
    html.classList.toggle('light', !dark)

    html.dataset.theme = dark ? 'dark' : 'light'
  }

  // 根据当前模式计算实际主题
  const updateTheme = () => {
    const dark =
      mode.value === 'dark' || (mode.value === 'system' && (mediaQuery?.matches ?? false))

    applyTheme(dark)
  }

  // 初始化主题
  const initTheme = () => {
    // 防止重复注册系统主题监听
    if (mediaQuery) return

    const savedMode = localStorage.getItem('O1_THEME')

    if (savedMode === 'light' || savedMode === 'dark') {
      mode.value = savedMode
    }

    // 默认跟随系统
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // 系统主题变化时，仅在 system 模式下响应
    mediaQuery.addEventListener('change', () => {
      if (mode.value === 'system') {
        updateTheme()
      }
    })

    updateTheme()
  }

  // 用户手动切换主题
  const setMode = (value: 'light' | 'dark') => {
    mode.value = value

    localStorage.setItem('O1_THEME', value)

    updateTheme()
  }

  return {
    mode,
    isDark,
    initTheme,
    setMode,
  }
})
