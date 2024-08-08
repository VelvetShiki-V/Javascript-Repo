import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const login = () => import('@/views/login/LoginView.vue')
const layout = () => import('@/views/layout/LayoutFrame.vue')
const list = () => import('@/views/model/ModelList.vue')
const command = () => import('@/views/model/CommandPanel.vue')
const defaultView = () => import('@/views/DefaultView.vue')

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      name: 'root',
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'layout',
      path: '/layout',
      component: layout,
      redirect: '/model/list',
      children: [
        {
          name: 'model',
          path: '/model/list',
          component: list
        },
        {
          name: 'command',
          path: '/model/command',
          component: command
        },
        {
          name: 'default',
          path: '/default',
          component: defaultView
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
  // 如果localStorage中没有数据，则同步更新到pinia仓库中
  const jsonToken: string | null = localStorage.getItem('user')
  if (jsonToken === null) userStore.removeLoginUser()
  if (userStore.token?.length === 0 && to.path !== '/login') {
    ElNotification.error('请先登录')
    return '/login'
  }
  // 登录页放行
  return true
})

export default router
