// 文章过滤表单
export type ArticleFilterDTO = {
  current: number
  size: number
  keywords: string
  categoryId: number
  tagId: number
  albumId: number
  loginType: number
  type: number
  status: number
  startTime: Date
  endTime: Date
  isDelete: number
  isReview: number
  isTop: number
  isFeatured: number
}

export const articleFilterDTOInit = (): ArticleFilterDTO => {
  return {
    current: 0,
    size: 0,
    keywords: '',
    categoryId: 0,
    tagId: 0,
    albumId: 0,
    loginType: 0,
    type: 0,
    status: 0,
    startTime: new Date(),
    endTime: new Date(),
    isDelete: 0,
    isReview: 0,
    isTop: 0,
    isFeatured: 0
  }
}
