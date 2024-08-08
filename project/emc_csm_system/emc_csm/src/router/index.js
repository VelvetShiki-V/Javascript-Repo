import Vue from 'vue'
import VueRouter from 'vue-router'
import GlobalLayout from '@/views/Home/GlobalLayout.vue'
import DefaultShow from '@/views/Home/DefaultShow.vue'
import { emcRequest } from '@/api/crud'
import store from '@/store'
import { Notification } from 'element-ui'

import emcTable from '@/views/table/emcTable'
import emcLogin from '@/views/login/loginIndex'
import NotFound from '@/views/NotFound'
Vue.use(VueRouter)

const routes = [
  // 一级路由
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: emcLogin
  },
  {
    path: '/home',
    component: GlobalLayout,
    children: [
      // 二级路由
      {
        path: '',
        component: DefaultShow // 默认显示
      },
      {
        name: 'emcTable',
        path: 'table/:name',
        component: emcTable,
        props: true
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history',
  linkActiveClass: 'active'
})

// 前置守卫
// 守卫页面: /home, /home/table/user, /home/table/role, /home/table/access...
const authUrls = ['/home']
const rule = /^\/home\/table\/\w+$/
router.beforeEach(async (to, from, next) => {
  if (!authUrls.includes(to.path) && !rule.test(to.path)) {
    // console.log('前往: ', to.path)
    // console.log(rule.test(to.path))
    next()
  } else {
    // 守卫页面，必须持有token才能进入(且该token必须有效)
    // console.log('进入守卫页面前, 需验证: ', to.path)
    const userInfo = store.state.user.userInfo
    if (!userInfo) {
      Notification.warning({
        title: '提示',
        message: '请先登录'
      })
      next('/login')
    } else {
      // local存在token，但需要验证token有效性
      const res = await emcRequest.postVerify({
        user: userInfo.user,
        token: userInfo.token
      })
      console.log('接收到认证信息: ', res)
      if (res.status === 401) {
        Notification.warning({
          title: '提示',
          message: 'token失效, 请先登录'
        })
        next('/login')
      } else next() // 验证通过, 允许放行
    }
  }
})
export default router
