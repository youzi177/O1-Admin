import type { TabPaneName } from 'element-plus'

interface TabItem {
  title: string
  path: string
  affix?: boolean
}

const STORAGE_KEY = 'o1-visited-tabs'

export function useListTab() {
  const route = useRoute()
  const router = useRouter()

  // 恢复本地保存的标签
  const restoreTabs = (): TabItem[] => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as TabItem[]

      if (!Array.isArray(saved)) return []

      return saved
        .filter((item) => {
          if (!item || typeof item.path !== 'string') return false

          const resolved = router.resolve(item.path)

          return resolved.matched.length > 0 && !resolved.meta.hideTab
        })
        .map((item) => {
          const resolved = router.resolve(item.path)

          return {
            path: item.path,
            title: String(resolved.meta.title || item.title || resolved.path),
            affix: Boolean(resolved.meta.affix),
          }
        })
    } catch {
      return []
    }
  }

  // 标签列表
  const tabs = ref<TabItem[]>(restoreTabs())

  // 当前激活标签
  const activeTab = ref('')

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

  // 监听路由变化，自动生成标签
  watch(
    () => route.fullPath,
    (path) => {
      if (route.meta.hideTab) return

      activeTab.value = path

      const exists = tabs.value.some((item) => item.path === path)

      if (!exists) {
        tabs.value.push({
          title: String(route.meta.title || route.path),
          path,
          affix: Boolean(route.meta.affix),
        })
      }
    },
    { immediate: true },
  )

  // 点击标签切换路由
  watch(activeTab, (path) => {
    if (path && path !== route.fullPath) {
      router.push(path)
    }
  })

  // 关闭指定标签
  const removeTab = (targetName: TabPaneName) => {
    const path = String(targetName)
    const index = tabs.value.findIndex((item) => item.path === path)
    const target = tabs.value[index]

    if (!target || target.affix) return

    const isActive = activeTab.value === path

    tabs.value.splice(index, 1)

    if (isActive) {
      const nextTab = tabs.value[index] || tabs.value[index - 1]

      if (nextTab) {
        router.push(nextTab.path)
      } else {
        router.push('/')
      }
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

    if (fallback) {
      router.push(fallback.path)
    } else {
      router.push('/')
    }
  }

  // 下拉菜单命令
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
    removeTab,
    closeLeft,
    closeRight,
    closeOthers,
    closeAll,
    handleCommand,
  }
}
