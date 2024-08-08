import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getUserCategoriesService,
  getUserService,
  userCategoriesDeleteService,
  userCategoryCreateService,
  userCategoryUpdateService,
  userDeleteService,
  userLoginService,
  userRegisterService,
  userUpdateService
} from '@/api/user.js'

// 用户模块
export const useUserStore = defineStore(
  'userStore',
  () => {
    // 定义仓库响应式数据和方法
    const dataEvent = {
      createEvent: 1,
      updateEvent: 2,
      deleteEvent: 3
    }

    // token
    const token = ref('')
    const getTokenAsync = async (form) => {
      token.value = await userLoginService(form)
    }
    const removeToken = () => {
      token.value = ''
    }

    // 登录信息
    const user = ref({})
    const getLoginUserAsync = async (params) => {
      const { list } = await getUserService(params)
      user.value = list.at(0)
    }
    const removeLoginUser = () => {
      user.value = {}
      removeToken()
    }

    // 角色列表
    const userCategories = ref([])
    const getUserCategoriesAsync = async (form) => {
      userCategories.value = await getUserCategoriesService(form)
    }
    const setUserCategoriesAsync = async (flag, form) => {
      if (flag === dataEvent.createEvent) await userCategoryCreateService(form)
      else if (flag === dataEvent.updateEvent)
        await userCategoryUpdateService(form)
      else if (flag === dataEvent.deleteEvent)
        await userCategoriesDeleteService(form)
    }

    // 用户列表
    const userList = ref([])
    const getUserListAsync = async (form) => {
      // 将含有list数组和total值的对象整个赋值给仓库数据userList
      userList.value = await getUserService(form)
    }
    const setUserListAsync = async (flag, form) => {
      if (flag === dataEvent.createEvent) await userRegisterService(form)
      else if (flag === dataEvent.updateEvent) {
        // 更新用户
        // 将role字符串转为cid值提供给后台
        if (typeof form.role === 'string') {
          console.log('进入转换cid逻辑')
          const role = form.role
          for (let category of userCategories.value) {
            if (category.role === role) form.role = category.cid
          }
        }
        await userUpdateService(form)
      } else if (flag === dataEvent.deleteEvent) await userDeleteService(form)
    }

    // 将数据方法暴露
    return {
      dataEvent,
      token,
      getTokenAsync,
      removeToken,
      user,
      getLoginUserAsync,
      removeLoginUser,
      userList,
      getUserListAsync,
      setUserListAsync,
      userCategories,
      getUserCategoriesAsync,
      setUserCategoriesAsync
    }
  },
  {
    // 第三个参数为持久化
    persist: true
  }
)
