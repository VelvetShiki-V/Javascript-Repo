import { ArticleTopFeaturedDTO } from '@/types/dto/ArticleTopFeaturedDTO'
import { ConditionDTO } from '@/types/dto/ConditionDTO'
import { ArticleAdminViewVO } from '@/types/vo/ArticleAdminViewVO'
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
const getArticleById = async (id: number): Promise<ArticleAdminViewVO> => {
  const article: ArticleAdminViewVO = await request.get(`/admin/articles/${id}`)
  console.log('获取到id为' + id + '的文章数据: ', article)
  return article
}

// 修改推荐或置顶文章
const updateTopFeaturedArticleById = async (form: ArticleTopFeaturedDTO): Promise<void> => {
  console.log('修改推荐或文章置顶表单: ', form)
  await request.post('/admin/articles/topFeatured', form)
}

export { getFilteredArticles, getArticleById, updateTopFeaturedArticleById }
