import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import 'reset-css'
import 'virtual:uno.css'
// import '@unocss/reset/normalize.css'
import '@unocss/reset/tailwind.css'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
