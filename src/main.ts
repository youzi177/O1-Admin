import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'
import { useThemeStore } from './stores/modules/theme.ts'
import { permissionDirective } from '@/utils/permission'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.directive('permission', permissionDirective)

const themeStore = useThemeStore(pinia)
themeStore.initTheme()
app.mount('#app')
