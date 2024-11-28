import { Tag } from '../dto/TagDTO'

// 文章列表渲染
export type ArticleAdminVO = {
  id: number
  articleCover: string
  articleTitle: string
  createTime: Date
  viewsCount: number
  categoryName: string
  tagDTOs: Array<Tag>
  isTop: number
  isFeatured: number
  isDelete: number
  status: number
  type: number
}

export const articleAdminVOInit = (): ArticleAdminVO => {
  return {
    id: 0,
    articleCover: '',
    articleTitle: '',
    createTime: new Date(),
    viewsCount: 0,
    categoryName: '',
    tagDTOs: [],
    isTop: 0,
    isFeatured: 0,
    isDelete: 0,
    status: 0,
    type: 0
  }
}
