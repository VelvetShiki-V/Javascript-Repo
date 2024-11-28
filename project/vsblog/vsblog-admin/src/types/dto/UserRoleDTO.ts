// 角色信息表单
export type UserRoleDTO = {
  userInfoId: number
  nickname: string
  roleIds: Array<number>
}
export const userRoleDTOInit = (): UserRoleDTO => {
  return {
    userInfoId: 0,
    nickname: '',
    roleIds: []
  }
}
