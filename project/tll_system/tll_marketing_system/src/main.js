// 核心包
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局组件
import PageTop from '@/components/PageTop'
import PageBot from '@/components/PageBot'
import PageTrace from '@/components/PageTrace'
import ElementUI from 'element-ui' // 全局引入组件库
import 'element-ui/lib/theme-chalk/index.css'

// 公共样式
import '@/styles/common.less'
import '@/styles/iconfont/part1/iconfont.css'
Vue.component('PageTop', PageTop)
Vue.component('PageBot', PageBot)
Vue.component('PageTrace', PageTrace)
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted (el) {
    el.focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
