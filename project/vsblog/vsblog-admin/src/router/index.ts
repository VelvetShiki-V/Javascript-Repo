import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const login = () => import('@/views/login/LoginView.vue')
const layout = () => import('@/views/layout/LayoutFrame.vue')
const article = () => import('@/views/article/ArticleView.vue')
const user = () => import('@/views/user/UserView.vue')
const tag = () => import('@/views/tag/TagView.vue')
// const category = () => import('@/views/category/CategoryView.vue')
const role = () => import('@/views/role/RoleView.vue')
const album = () => import('@/views/album/AlbumView.vue')
const about = () => import('@/views/about/AboutView.vue')

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
      redirect: '/article',
      children: [
        {
          name: 'article',
          path: '/article',
          component: article
        },
        {
          name: 'user',
          path: '/user',
          component: user
        },
        {
          name: 'tag',
          path: '/tag',
          component: tag
        },
        // {
        //   name: 'category',
        //   path: '/category',
        //   component: category
        // },
        {
          name: 'role',
          path: '/role',
          component: role
        },
        {
          name: 'album',
          path: '/album',
          component: album
        },
        {
          name: 'about',
          path: '/about',
          component: about
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
  // const jsonToken: string | null = localStorage.getItem('user')
  // if (jsonToken === null) userStore.removeLoginUser()
  if (userStore.token?.length === 0 && to.path !== '/login') {
    console.log('请先登录')
    return '/login'
  }
  // 登录页放行
  return true
})

export default router
