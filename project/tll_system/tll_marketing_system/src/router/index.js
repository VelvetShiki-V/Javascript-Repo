import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { userRequest } from '@/api/register'
import { Notification } from 'element-ui'

// 频繁访问页面一次性加载

import home from '@/views/home/homeIndex'
import cart from '@/views/cart/cartIndex'
import login from '@/views/login/loginIndex'
import register from '@/views/register/registerIndex'
import order from '@/views/order/orderIndex'
import detail from '@/views/detail/detailIndex'
import notFound from '@/views/notFound'
import upload from '@/views/upload/uploadIndex'
import account from '@/views/login/accountLogin'
import qrcode from '@/views/login/qrcodeLogin'

// 组件异步加载
// const login = () => import('@/views/login/loginIndex')
// const register = () => import('@/views/register/registerIndex')
// const order = () => import('@/views/order/orderIndex')
// const detail = () => import('@/views/detail/detailIndex')
// const notFound = () => import('@/views/notFound')
// const upload = () => import('@/views/upload/uploadIndex')
// const account = () => import('@/views/login/accountLogin')
// const qrcode = () => import('@/views/login/qrcodeLogin')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: home },
  { path: '/cart', component: cart },
  {
    path: '/login',
    component: login,
    children: [
      {
        path: '/account',
        component: account
      },
      {
        path: '/qrcode',
        component: qrcode
      }
    ]

  },
  { path: '/register', component: register },
  { path: '/order', component: order },
  { path: '/upload', component: upload },
  { path: '/detail/:gid', name: 'detail', component: detail },
  { path: '*', component: notFound }
]

const router = new VueRouter({
  routes,
  // mode: 'history', // 需要以哈希模式路由，否则生产模式无法渲染
  // 模糊/精确匹配
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})

// 前置守卫
const authUrls = ['/cart', '/order', '/pay']
router.beforeEach(async (to, from, next) => {
  // 非守卫页面，直接放行
  if (!authUrls.includes(to.path)) {
    next()
  } else {
    // 守卫页面，必须持有token才能进入(且该token必须有效)
    const userInfo = store.state.user.userInfo
    if (!userInfo) {
      Notification.warning({
        title: '提示',
        message: '请先登录淘乐乐账户'
      })
      next('/account')
    } else {
      // local存在token，但需要验证token有效性
      const res = await userRequest.postToken({ token: userInfo.token })
      if (res.status === 401) {
        Notification.warning({
          title: '提示',
          message: 'token失效, 请先登录淘乐乐账户'
        })
        next('/account')
      } else next() // 验证通过, 允许放行
    }
  }
})

export default router
