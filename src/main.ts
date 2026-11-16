import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import 'reset-css'
import 'virtual:uno.css'
// import '@unocss/reset/normalize.css'
import '@unocss/reset/tailwind.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'
import { useThemeStore } from './stores/modules/theme.ts'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// 在挂载之前初始化主题
const themeStore = useThemeStore(pinia)
themeStore.initTheme()
app.mount('#app')
