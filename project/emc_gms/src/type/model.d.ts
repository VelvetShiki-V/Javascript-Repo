// 自定义类型声明导出
export type ModelInstance = {
  Id: string
  Name: string
  Owner: string
  Labels: Array<string>
  Ts: string
  Properties: Array<object>
  Children: Array<object>
}
