import type { TabPaneName } from 'element-plus'

export interface TabItem {
  title: string
  path: string
  affix?: boolean
  keepAlive?: boolean
  cacheName?: string
}

const STORAGE_KEY = 'o1-visited-tabs'

export function useListTab() {
  const route = useRoute()
  const router = useRouter()

  // 从路由元信息中提取标签数据，避免依赖过期的本地缓存配置
  const createTab = (path: string, title?: string): TabItem => {
    const resolved = router.resolve(path)

    return {
      path,
      title: String(resolved.meta.title || title || resolved.path),
      affix: Boolean(resolved.meta.affix),
      keepAlive: Boolean(resolved.meta.keepAlive),
      cacheName: typeof resolved.meta.cacheName === 'string' ? resolved.meta.cacheName : undefined,
    }
  }

  // 恢复本地保存的标签；缓存配置始终以当前路由配置为准
  const restoreTabs = (): TabItem[] => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

      if (!Array.isArray(saved)) return []

      const restored = saved
        .filter((item): item is TabItem => {
          if (!item || typeof item.path !== 'string') return false

          const resolved = router.resolve(item.path)
          return resolved.matched.length > 0 && !resolved.meta.hideTab
        })
        .map((item) => createTab(item.path, item.title))

      return restored
    } catch {
      return []
    }
  }

  const tabs = ref<TabItem[]>(restoreTabs())
  const activeTab = ref('')

  // KeepAlive include 匹配组件 name，而不是路由 path
  // 同一个页面可能对应多个 fullPath 标签，因此按组件名去重
  const cacheNames = computed(() =>
    [...new Set(tabs.value.filter((item) => item.keepAlive && item.cacheName).map((item) => item.cacheName!))],
  )

  // 持久化标签
  watch(
    tabs,
    (value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      } catch {
        // 本地存储不可用时，不影响标签页正常使用
      }
    },
    { deep: true },
  )

  // 路由变化时同步当前标签
  watch(
    () => route.fullPath,
    (path) => {
      if (route.meta.hideTab) return

      activeTab.value = path

      if (!tabs.value.some((item) => item.path === path)) {
        tabs.value.push(createTab(path))
      }
    },
    { immediate: true },
  )

  // 点击标签切换路由
  watch(activeTab, (path) => {
    if (path && path !== route.fullPath) {
      void router.push(path)
    }
  })

  // 关闭标签
  const removeTab = (targetName: TabPaneName) => {
    const path = String(targetName)
    const index = tabs.value.findIndex((item) => item.path === path)
    const target = tabs.value[index]

    if (!target || target.affix) return

    const isActive = activeTab.value === path
    tabs.value.splice(index, 1)

    if (isActive) {
      const nextTab = tabs.value[index] || tabs.value[index - 1]
      void router.push(nextTab?.path || '/')
    }
  }

  // 关闭左侧标签
  const closeLeft = () => {
    const index = tabs.value.findIndex((item) => item.path === activeTab.value)
    if (index === -1) return

    tabs.value = tabs.value.filter((item, i) => i >= index || item.affix)
  }

  // 关闭右侧标签
  const closeRight = () => {
    const index = tabs.value.findIndex((item) => item.path === activeTab.value)
    if (index === -1) return

    tabs.value = tabs.value.filter((item, i) => i <= index || item.affix)
  }

  // 关闭其他标签
  const closeOthers = () => {
    tabs.value = tabs.value.filter((item) => item.path === activeTab.value || item.affix)
  }

  // 关闭全部标签
  const closeAll = () => {
    tabs.value = tabs.value.filter((item) => item.affix)

    const fallback = tabs.value[0]
    void router.push(fallback?.path || '/')
  }

  const handleCommand = (command: string) => {
    switch (command) {
      case 'close-current':
        removeTab(activeTab.value)
        break
      case 'close-left':
        closeLeft()
        break
      case 'close-right':
        closeRight()
        break
      case 'close-others':
        closeOthers()
        break
      case 'close-all':
        closeAll()
        break
    }
  }

  return {
    tabs,
    activeTab,
    cacheNames,
    removeTab,
    closeLeft,
    closeRight,
    closeOthers,
    closeAll,
    handleCommand,
  }
}
