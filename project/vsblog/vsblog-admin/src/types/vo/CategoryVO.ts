// 文章分类渲染
export type CategoryVO = {
  id: number
  categoryName: string
  articleCount: number
  createTime: number
}

export const categoryVOInit = (): CategoryVO => {
  return {
    id: 0,
    categoryName: '',
    articleCount: 0,
    createTime: 0
  }
}
