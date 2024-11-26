export type APIResponse<T = any> = {
  code: string
  data: T
  message: string
  flag: boolean
}
