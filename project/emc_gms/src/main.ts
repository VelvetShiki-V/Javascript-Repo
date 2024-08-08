import persist from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'
import '@/styles/global.css'

const app = createApp(App)
app.use(createPinia().use(persist))
app.use(router)
app.use(pinia)
app.mount('#app')
