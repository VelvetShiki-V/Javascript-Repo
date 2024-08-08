import { Notification } from 'element-ui'
const INFO_KEY = 'user_authentication'

// 专用于存储用户本地localStorage凭证信息
// 获取用户数据(uid + token + username)——本地仓库vuex临时存储调用
function getToken () {
  const ret = localStorage.getItem(INFO_KEY)
  if (ret) return JSON.parse(ret)
  else return null
}

// 设置用户数据——登录成功时设置(uid + token + username)
function setToken (userInfo) {
  const data = JSON.stringify(userInfo)
  if (!data) {
    Notification.error({
      title: '错误',
      message: 'setToken: 用户token存储失败'
    })
  } else localStorage.setItem(INFO_KEY, data)
}

// 清除localStorage存储的用户凭证(退出登录或主动登出调用)
function removeToken () {
  localStorage.removeItem(INFO_KEY)
}

export const storage = {
  getToken,
  setToken,
  removeToken
}
