// 文章标签渲染
export type TagVO = {
  id: number
  tagName: string
  articleCount: number
  createTime: number
}

export const tagVOInit = (): TagVO => {
  return {
    id: 0,
    tagName: '',
    articleCount: 0,
    createTime: 0
  }
}
