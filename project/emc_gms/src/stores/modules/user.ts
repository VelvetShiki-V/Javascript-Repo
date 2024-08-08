import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userLoginService } from '@/api/user'
import { LoginData } from '@/type/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // 仓库数据和方法

    // token
    const token = ref<string>()
    const getTokenAsync = async (form: LoginData) => {
      token.value = await userLoginService(form)
    }
    const removeToken = () => {
      token.value = ''
    }

    // loginUser
    const loginUser = ref<LoginData>()
    const setLoginUser = (form: LoginData) => {
      loginUser.value = form
    }
    const removeLoginUser = () => {
      loginUser.value = {
        username: '',
        password: ''
      }
      removeToken()
    }

    return {
      token,
      getTokenAsync,
      removeToken,
      loginUser,
      setLoginUser,
      removeLoginUser
    }
  },
  {
    persist: true
  }
)
