import request from '@/utils/request'
import type { AdminInfo, LoginForm } from '@/types/user'

// 登录接口，返回token
const adminLoginService = async (form: LoginForm): Promise<string> => {
  console.log('登录表单数据: ', form)
  return await request.get(
    `/sso/doLogin?name=${form.name}&pwd=${form.password}`
  )
}

// 登录用户信息获取，返回用户数据
const adminInfoService = async (): Promise<AdminInfo> => {
  console.log('信息查询服务')
  return await request.get('/user/userInfo')
}

export { adminLoginService, adminInfoService }
