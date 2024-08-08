import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index.js'

const router = createRouter({
  // 默认使用历史模式，改为hash模式可以用createHashHistory()
  // import.meta.env.BASE_URL为基础路由路径，默认是/, 为vite环境变量vite.config.js
  history: createWebHistory(import.meta.env.BASE_URL),
  // 等价于
  // history: createWebHistory('/')
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/layout',
      component: () => import('@/views/layout/LayoutFrame.vue'),
      redirect: '/article/categories',
      children: [
        {
          path: '/article/categories',
          component: () => import('@/views/article/UserCategories.vue')
        },
        {
          path: '/article/manage',
          component: () => import('@/views/article/UserManager.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to) => {
  // 默认return undefined即为直接放行
  // 根据返回值决定返回还是放行(true/undefined放行，false拦截回from路由)
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    ElNotification.error('请先登录')
    return '/login'
  }
  // 登录页放行
  return true
})

export default router
