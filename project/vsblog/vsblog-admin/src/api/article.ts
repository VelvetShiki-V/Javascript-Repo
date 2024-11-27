import request from '@/utils/request'
import { ArticleAdmin } from '@/types/article'

const getAllArticles = async (): Promise<Array<ArticleAdmin>> => {
  console.log('文章列表获取')
  return await request.get('/articles/all')
}

export { getAllArticles }
