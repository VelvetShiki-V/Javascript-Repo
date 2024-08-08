import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/main.scss'

// pinia独立维护
import pinia from '@/stores/index'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
