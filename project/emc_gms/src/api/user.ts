import request from '@/utils/request'
import { LoginData } from '@/type/user'

// 用户登录
// 参数为LoginData类型，返回值为string的data泛型
const userLoginService = async (form: LoginData): Promise<string> => {
  console.log('用户登录信息: ', form)
  return await request.post('/user/login', form)
}

export { userLoginService }
