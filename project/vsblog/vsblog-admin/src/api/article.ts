import { ConditionDTO } from '@/types/dto/ConditionDTO'
import { ArticleAdminVO } from '@/types/vo/ArticleAdminVO'
import { PageResultVO } from '@/types/vo/PageResultVO'
import request from '@/utils/request'

// 根据条件获取后台文章列表
const getFilteredArticles = async (form: ConditionDTO): Promise<PageResultVO<ArticleAdminVO>> => {
  const pageResults: PageResultVO<ArticleAdminVO> = await request.get('/admin/articles', {
    params: form
  })
  // console.log('获取到后台文章数据: ', pageResults)
  return pageResults
}

// 根据id获取后台文章
const getArticleById = async (id: number): Promise<ArticleAdminVO> => {
  const article: ArticleAdminVO = await request.get(`/${id}`)
  // console.log('获取到id为' + id + '的文章数据: ', article)
  return article
}

export { getFilteredArticles, getArticleById }
