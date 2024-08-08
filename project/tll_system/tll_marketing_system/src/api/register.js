import request from '@/utils/request'
// 发送注册信息
async function postRegistration (postData) {
  return await request.post('/register', postData) // 必须返回，否则外部对象接收不到promise响应对象
}

// 发送登录信息
async function postLogin (postData) {
  return await request.post('/login', postData)
}

// 验证token
async function postToken (postData) {
  return await request.post('/token_verify', postData)
}

// 命名导出
export const userRequest = {
  postRegistration,
  postLogin,
  postToken
}
