import { ArticleAdminVO } from './ArticleAdminVO'

// 文章列表渲染
export type ArticleDataVO = {
  records: Array<ArticleAdminVO>
  count: number
}

export const articleDataVOInit = (): ArticleDataVO => {
  return {
    records: [],
    count: 0
  }
}
