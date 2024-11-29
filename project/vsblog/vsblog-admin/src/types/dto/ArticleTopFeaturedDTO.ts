// 文章推荐和置顶表单
export type ArticleTopFeaturedDTO = {
  id: number
  isTop: number
  isFeatured: number
}

export const articleTopFeaturedDTOInit = (): ArticleTopFeaturedDTO => {
  return {
    id: 0,
    isTop: 0,
    isFeatured: 0
  }
}
