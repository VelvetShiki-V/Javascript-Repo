import { ArticleDataVO } from '@/types/vo/ArticleDataVO'
import request from '@/utils/request'

const getAllArticles = async (): Promise<ArticleDataVO> => {
  console.log('文章列表获取')
  const data: ArticleDataVO = await request.get('/adminArticles?isDelete=0')
  console.log('获取到文章数据: ', data)
  return data
}

export { getAllArticles }
