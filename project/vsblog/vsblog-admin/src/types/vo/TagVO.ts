// 文章标签渲染
export type CategoryVO = {
  id: number
  tagName: string
  articleCount: number
  createTime: number
}

export const categoryVOInit = (): CategoryVO => {
  return {
    id: 0,
    tagName: '',
    articleCount: 0,
    createTime: 0
  }
}
