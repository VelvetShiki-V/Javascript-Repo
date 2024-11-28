// axios接收类型

export type APIResponse<T = any> = {
  code: string
  data: T
  message: string
  flag: boolean
}

export const APIResponseInit = (): APIResponse => {
  return {
    code: '',
    data: null,
    message: '',
    flag: false
  }
}
