// 用户信息渲染
export type AdminInfoVO = {
  id: number
  loginType: number
  username: string
  nickname: string
  avatar: string
  roles: Array<string>
  ipAddress: string
  ipSource: string
  createTime: Date
  lastLoginTime: Date
  isDisable: number
  status: number
}

export const adminInfoVOInit = (): AdminInfoVO => {
  return {
    id: 0,
    loginType: 0,
    username: '',
    nickname: '',
    avatar: '',
    roles: [],
    ipAddress: '',
    ipSource: '',
    createTime: new Date(),
    lastLoginTime: new Date(),
    isDisable: 0,
    status: 0
  }
}
