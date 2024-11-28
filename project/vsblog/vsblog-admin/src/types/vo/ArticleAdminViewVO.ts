// 文章详情渲染
export type ArticleAdminViewVO = {
  id: number
  articleAbstract: string
  articleCover: string
  articleTitle: string
  articleContent: string
  categoryName: string
  tagNames: Array<string>
  isTop: number
  isFeatured: number
  status: number
  type: number
  originalUrl: string
  password: string
}

export const articleAdminViewVOInit = (): ArticleAdminViewVO => {
  return {
    id: 0,
    articleAbstract: '',
    articleCover: '',
    articleTitle: '',
    articleContent: '',
    categoryName: '',
    tagNames: [],
    isTop: 0,
    isFeatured: 0,
    status: 0,
    type: 0,
    originalUrl: '',
    password: ''
  }
}
