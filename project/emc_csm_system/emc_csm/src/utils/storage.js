import { Notification } from 'element-ui'
const INFO_KEY = 'user_authentication'

function getToken () {
  const ret = localStorage.getItem(INFO_KEY)
  if (ret) return JSON.parse(ret)
  else return null
}

function setToken (userInfo) {
  const data = JSON.stringify(userInfo)
  if (!data) {
    Notification.error({
      title: '错误',
      message: 'setToken: 用户token存储失败'
    })
  } else localStorage.setItem(INFO_KEY, data)
}

function removeToken () {
  localStorage.removeItem(INFO_KEY)
}

export const storage = {
  getToken,
  setToken,
  removeToken
}
