// 用户登录表单
export type UserAuthDTO = {
  name: string
  password: string
}

export const userAuthDTOInit = (): UserAuthDTO => {
  return {
    name: '',
    password: ''
  }
}
