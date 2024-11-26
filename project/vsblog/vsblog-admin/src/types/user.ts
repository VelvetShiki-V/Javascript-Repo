type LoginForm = {
  name: string
  password: string
}

type AdminInfo = {
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

export type { LoginForm, AdminInfo }
