import { ref } from 'vue'
import { defineStore } from 'pinia'
import { adminLoginService, adminInfoService } from '@/api/user'
import { LoginForm, AdminInfo } from '@/types/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref<string>()
    const loginSSO = async (form: LoginForm) => {
      token.value = await adminLoginService(form)
    }

    // AdminInfo
    const loginAdminInfo = ref<AdminInfo>()
    const getLoginAdminInfo = async () => {
      loginAdminInfo.value = await adminInfoService()
    }

    return {
      token,
      loginSSO,
      loginAdminInfo,
      getLoginAdminInfo
    }
  },
  {
    persist: true
  }
)
