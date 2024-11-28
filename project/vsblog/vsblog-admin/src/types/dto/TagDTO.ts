// 标签表单
export type Tag = {
  id: number
  tagName: string
}

export const tagInit = (): Tag => {
  return {
    id: 0,
    tagName: ''
  }
}
