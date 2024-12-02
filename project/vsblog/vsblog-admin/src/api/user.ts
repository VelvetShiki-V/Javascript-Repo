import { UserAuthDTO } from '@/types/dto/UserAuthDTO'
import { AdminInfoVO } from '@/types/vo/AdminInfoVO'
import request from '@/utils/request'

// 登录接口，返回token
const adminLoginService = async (form: UserAuthDTO): Promise<string> => {
  // console.log('登录表单数据: ', form)
  return await request.get(`/sso/doLogin?name=${form.name}&pwd=${form.password}`)
}

// 登录用户信息获取，返回用户数据
const adminInfoService = async (): Promise<AdminInfoVO> => {
  // console.log('信息查询服务')
  return await request.get('/user/userInfo')
}

export { adminLoginService, adminInfoService }
