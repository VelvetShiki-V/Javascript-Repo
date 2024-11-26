import { ref } from 'vue'
import { defineStore } from 'pinia'
import { adminLoginService, adminInfoService } from '@/api/user'
import { LoginForm, AdminInfo } from '@/types/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // token
    // const token = ref<string>()
    const loginSSO = async (form: LoginForm) => {
      await adminLoginService(form)
    }

    // AdminInfo
    const loginAdminInfo = ref<AdminInfo>()
    const getLoginAdminInfo = async () => {
      loginAdminInfo.value = await adminInfoService()
    }
    const removeLoginUser = () => delete loginAdminInfo.value

    return {
      loginSSO,
      loginAdminInfo,
      getLoginAdminInfo,
      removeLoginUser
    }
  },
  {
    persist: true
  }
)
