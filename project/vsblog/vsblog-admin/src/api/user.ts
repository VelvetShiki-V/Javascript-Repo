import request from '@/utils/request'
import type { AdminInfo, LoginForm } from '@/types/user'

const adminLoginService = async (form: LoginForm): Promise<void> => {
  console.log('登录表单数据: ', form)
  await request.get(`/sso/doLogin?name=${form.name}&pwd=${form.password}`)
}

const adminInfoService = async (): Promise<AdminInfo> => {
  console.log('信息查询服务')
  return await request.get('/user/getLoginUser')
}

export { adminLoginService, adminInfoService }
