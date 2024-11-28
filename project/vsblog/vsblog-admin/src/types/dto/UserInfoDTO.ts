// 用户信息表单
export type UserInfoDTO = {
  nickname: string
  intro: string
  website: string
}

export const userInfoDTOInit = (): UserInfoDTO => {
  return {
    nickname: '',
    intro: '',
    website: ''
  }
}
