import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
import router from './router'
import pinia from '@/stores/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 全局样式
import '@/styles/global.css'
// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import '@quasar/extras/line-awesome/line-awesome.css'
// Import Quasar css
import 'quasar/dist/quasar.css'

const app = createApp(App)
app.use(createPinia().use(persist))
app.use(router)
app.use(pinia)
app.use(mavonEditor)
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang
})
app.mount('#app')
