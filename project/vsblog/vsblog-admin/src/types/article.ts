type ArticleAdmin = {
  id: number
  articleCover: string
  articleTitle: string
  createTime: Date
  viewsCount: number
  categoryName: string
  tagDTOs: Array<string>
  isTop: number
  isFeatured: number
  isDelete: number
  status: number
  type: number
}

type ArticleAdminView = {
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

export type { ArticleAdmin, ArticleAdminView }
